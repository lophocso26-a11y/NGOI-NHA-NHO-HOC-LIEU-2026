/**
 * AudioManager - Comprehensive Sound & Speech Engine
 * - Primary Voice Engine: Gemini 3.8 Flash Lite TTS via server endpoint /api/tts (Warm, natural Vietnamese teacher voice)
 * - Fallback Voice Engine: Web Speech API (vi-VN / en-US) with clear engine & status indicators
 * - Web Audio API Synthesizer for instant, reliable sound effects (no missing files)
 * - Ducking effect (background music lowers volume when teacher or character speaks)
 * - Full state tracking (idle, loading, playing, error) with listener callbacks
 */

export type CharacterSpeaker = 'teacher' | 'minh' | 'an';

export type SoundEffectType =
  | 'click'
  | 'correct'
  | 'wrong'
  | 'complete'
  | 'star'
  | 'magic'
  | 'badge'
  | 'sparkle'
  | 'roomSelect'
  | 'openDoor';

export type VoiceEngine = 'gemini_tts' | 'browser_fallback' | 'cached_audio';

export interface SpeakingState {
  speaking: boolean;
  loading: boolean;
  text: string;
  speaker: CharacterSpeaker;
  engine: VoiceEngine;
  errorMessage?: string;
  sourceUrl?: string;
}

class AudioManager {
  private audioCtx: AudioContext | null = null;
  private isSpeechMuted: boolean = false;
  private isMusicMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmIntervalId: number | null = null;

  // Active playback objects
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentBlobUrl: string | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  // Last speech memory for replay
  private lastSpokenText: string = '';
  private lastSpeaker: CharacterSpeaker = 'teacher';
  private lastLanguage: 'vi' | 'en' = 'vi';

  // Status callback
  private speakingListener: ((state: SpeakingState) => void) | null = null;
  private currentState: SpeakingState = {
    speaking: false,
    loading: false,
    text: '',
    speaker: 'teacher',
    engine: 'gemini_tts'
  };

  constructor() {
    // AudioContext will be initialized on first user click
  }

  private initAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public registerSpeakingListener(callback: (state: SpeakingState) => void) {
    this.speakingListener = callback;
  }

  private updateState(newState: Partial<SpeakingState>) {
    this.currentState = { ...this.currentState, ...newState };
    if (this.speakingListener) {
      this.speakingListener(this.currentState);
    }
  }

  public getCurrentState(): SpeakingState {
    return this.currentState;
  }

  public setSpeechMuted(muted: boolean) {
    this.isSpeechMuted = muted;
    if (muted) {
      this.stopSpeech();
    }
  }

  public setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (muted && this.isBgmPlaying) {
      this.toggleBgm(false);
    }
  }

  // Alias for backward compatibility
  public setMuted(muted: boolean) {
    this.setSpeechMuted(muted);
    this.setMusicMuted(muted);
  }

  public getMuted(): boolean {
    return this.isSpeechMuted;
  }

  /**
   * Stop any current speech (both HTML5 Audio and Web Speech API)
   */
  public stopSpeech() {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {
        // Safe guard
      }
      this.currentAudioElement = null;
    }

    if (this.currentBlobUrl) {
      try {
        URL.revokeObjectURL(this.currentBlobUrl);
      } catch {
        // Safe guard
      }
      this.currentBlobUrl = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Safe guard
      }
    }
    this.currentUtterance = null;

    this.updateState({
      speaking: false,
      loading: false,
      text: '',
      errorMessage: undefined
    });
  }

  /**
   * Speak Vietnamese text using Gemini 3.8 Flash Lite TTS with automatic fallback to Web Speech API
   */
  public async speakVietnamese(
    text: string,
    speaker: CharacterSpeaker = 'teacher'
  ): Promise<void> {
    if (this.isSpeechMuted) return;

    // Immediately stop prior speech
    this.stopSpeech();

    const cleanText = text.trim();
    if (!cleanText) return;

    this.lastSpokenText = cleanText;
    this.lastSpeaker = speaker;
    this.lastLanguage = 'vi';

    // Set loading state
    this.updateState({
      speaking: true,
      loading: true,
      text: cleanText,
      speaker,
      engine: 'gemini_tts',
      errorMessage: undefined
    });

    try {
      // 1. Check if we have a direct pre-cached static file for standard greetings
      let preCachedUrl = '';
      if (cleanText.includes('Chào mừng các em đến với Ngôi nhà nhỏ – Kho báu yêu thương! Hôm nay, cô và các em')) {
        preCachedUrl = '/audio_cache/teacher_test.wav';
      } else if (cleanText.includes('Xin chào các em yêu quý! Chào mừng các em đến với Ngôi nhà nhỏ')) {
        preCachedUrl = '/audio_cache/welcome_greeting.wav';
      }

      if (preCachedUrl) {
        try {
          await this.playAudioFromUrl(preCachedUrl, 'cached_audio');
          return;
        } catch {
          // Fall through to API call if static file fetch failed
        }
      }

      // 2. Call server-side /api/tts endpoint powering Gemini TTS
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: cleanText,
          lang: 'vi',
          speaker
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server TTS error (status ${response.status})`);
      }

      const data = await response.json();
      if (!data.audio) {
        throw new Error('No audio payload received from TTS server');
      }

      // Convert base64 WAV into a Blob URL and play
      const byteChars = atob(data.audio);
      const byteNumbers = new Uint8Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: data.mimeType || 'audio/wav' });
      const blobUrl = URL.createObjectURL(blob);

      await this.playAudioFromUrl(blobUrl, 'gemini_tts');
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('[AudioManager] Gemini TTS failed, engaging Web Speech API fallback:', error.message);

      this.updateState({
        loading: false,
        engine: 'browser_fallback',
        errorMessage: `Gemini TTS: ${error.message}. Đang dùng giọng dự phòng trình duyệt.`
      });

      // 3. Fallback to Web Speech API
      this.playWebSpeech(cleanText, 'vi-VN', speaker);
    }
  }

  // Alias for backward compatibility
  public playVietnamese(text: string, speaker: CharacterSpeaker = 'teacher') {
    return this.speakVietnamese(text, speaker);
  }

  /**
   * Speak English text using Gemini TTS or Web Speech API
   */
  public async speakEnglish(text: string): Promise<void> {
    if (this.isSpeechMuted) return;

    this.stopSpeech();

    const cleanText = text.trim();
    if (!cleanText) return;

    this.lastSpokenText = cleanText;
    this.lastLanguage = 'en';

    this.updateState({
      speaking: true,
      loading: true,
      text: cleanText,
      speaker: 'teacher',
      engine: 'gemini_tts',
      errorMessage: undefined
    });

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: cleanText,
          lang: 'en',
          speaker: 'teacher'
        })
      });

      if (!response.ok) {
        throw new Error(`TTS server error (${response.status})`);
      }

      const data = await response.json();
      if (!data.audio) {
        throw new Error('No audio payload received');
      }

      const byteChars = atob(data.audio);
      const byteNumbers = new Uint8Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: data.mimeType || 'audio/wav' });
      const blobUrl = URL.createObjectURL(blob);

      await this.playAudioFromUrl(blobUrl, 'gemini_tts');
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('[AudioManager] English TTS failed, fallback:', error.message);

      this.updateState({
        loading: false,
        engine: 'browser_fallback'
      });

      this.playWebSpeech(cleanText, 'en-US', 'teacher');
    }
  }

  // Alias for backward compatibility
  public playEnglish(text: string) {
    return this.speakEnglish(text);
  }

  /**
   * Play an audio URL via HTMLAudioElement
   */
  private playAudioFromUrl(url: string, engine: VoiceEngine): Promise<void> {
    return new Promise((resolve, reject) => {
      this.currentBlobUrl = url;
      const audio = new Audio(url);
      this.currentAudioElement = audio;

      audio.onplay = () => {
        this.updateState({
          speaking: true,
          loading: false,
          engine
        });
      };

      audio.onended = () => {
        this.stopSpeech();
        resolve();
      };

      audio.onerror = () => {
        this.stopSpeech();
        reject(new Error('HTMLAudioElement failed to play audio stream'));
      };

      audio.play().catch(playErr => {
        console.warn('[AudioManager] Autoplay blocked, requires gesture:', playErr);
        reject(playErr);
      });
    });
  }

  /**
   * Web Speech API fallback for browsers
   */
  private playWebSpeech(text: string, lang: 'vi-VN' | 'en-US', speaker: CharacterSpeaker) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.updateState({
        speaking: false,
        loading: false,
        errorMessage: 'Trình duyệt không hỗ trợ Web Speech API và Gemini TTS offline.'
      });
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    if (lang === 'vi-VN') {
      if (speaker === 'teacher') {
        utterance.pitch = 1.05;
        utterance.rate = 0.92;
      } else if (speaker === 'minh') {
        utterance.pitch = 1.25;
        utterance.rate = 1.02;
      } else {
        utterance.pitch = 1.35;
        utterance.rate = 1.0;
      }
    } else {
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
    }

    // Attempt to match language voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      v => v.lang.startsWith(lang.slice(0, 2)) || v.name.toLowerCase().includes(lang === 'vi-VN' ? 'viet' : 'english')
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.currentUtterance = utterance;
      this.updateState({
        speaking: true,
        loading: false,
        engine: 'browser_fallback'
      });
    };

    utterance.onend = () => {
      this.stopSpeech();
    };

    utterance.onerror = () => {
      this.stopSpeech();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      this.stopSpeech();
    }
  }

  public replaySpeech() {
    if (!this.lastSpokenText) return;
    if (this.lastLanguage === 'en') {
      this.speakEnglish(this.lastSpokenText);
    } else {
      this.speakVietnamese(this.lastSpokenText, this.lastSpeaker);
    }
  }

  /**
   * Sound effects synthesized dynamically via Web Audio API.
   * Works 100% reliably without network requests.
   */
  public playSoundEffect(type: SoundEffectType) {
    if (this.isSpeechMuted) return;
    const ctx = this.initAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'roomSelect' || type === 'openDoor') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'correct') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.09);
          gain.gain.setValueAtTime(0, now + i * 0.09);
          gain.gain.linearRampToValueAtTime(0.28, now + i * 0.09 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.09);
          osc.stop(now + i * 0.09 + 0.36);
        });
      } else if (type === 'wrong') {
        [320, 260].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.12);
          gain.gain.setValueAtTime(0.2, now + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.12);
          osc.stop(now + i * 0.12 + 0.2);
        });
      } else if (type === 'magic' || type === 'sparkle') {
        const freqs = [659.25, 783.99, 987.77, 1174.66, 1318.51, 1567.98];
        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
          gain.gain.setValueAtTime(0.18, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.41);
        });
      } else if (type === 'star') {
        [880, 1108.73, 1318.51, 1760].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.07);
          gain.gain.setValueAtTime(0.22, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.31);
        });
      } else if (type === 'complete' || type === 'badge') {
        const fanfare = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.51];
        const times = [0, 0.1, 0.2, 0.3, 0.45, 0.55, 0.7];
        fanfare.forEach((freq, idx) => {
          const t = now + times[idx];
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.3, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.46);
        });
      }
    } catch {
      // Audio synthesis fallback guard
    }
  }

  /**
   * Ambient gentle background chime chords
   */
  public toggleBgm(enabled: boolean) {
    this.isBgmPlaying = enabled;
    if (!enabled || this.isMusicMuted) {
      if (this.bgmIntervalId) {
        window.clearInterval(this.bgmIntervalId);
        this.bgmIntervalId = null;
      }
      return;
    }

    const ctx = this.initAudioContext();
    if (!ctx) return;

    const playSoftChord = () => {
      if (this.isMusicMuted || !this.isBgmPlaying) return;
      if (this.currentState.speaking) return; // Ducking: don't play chord during speech

      try {
        const chord = [261.63, 329.63, 392.0, 523.25];
        const now = ctx.currentTime;
        chord.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.02, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 5.6);
        });
      } catch {
        // Silent catch
      }
    };

    playSoftChord();
    if (this.bgmIntervalId) window.clearInterval(this.bgmIntervalId);
    this.bgmIntervalId = window.setInterval(playSoftChord, 12000);
  }

  public isBgmActive(): boolean {
    return this.isBgmPlaying;
  }
}

export const audioManager = new AudioManager();
