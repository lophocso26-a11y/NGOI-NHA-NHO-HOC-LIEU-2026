import { GoogleGenAI } from '@google/genai';

interface VercelRequestLike {
  method?: string;
  body?: { text?: string; lang?: string; speaker?: string; style?: string };
}

interface VercelResponseLike {
  status: (code: number) => { json: (data: unknown) => void };
}

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, lang = 'vi', speaker = 'teacher', style } = req.body || {};

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid text parameter' });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on server',
        fallback: true
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    let voiceName = 'Kore';
    if (speaker === 'minh') {
      voiceName = 'Puck';
    }

    let styleDescription =
      style ||
      (lang === 'en'
        ? 'Speak clearly with accurate English pronunciation for primary school children.'
        : 'Speak in natural Vietnamese with a warm, gentle, expressive female primary-school teacher voice. Clear pronunciation with authentic Vietnamese tones, cheerful intonation, moderate child-friendly pacing.');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${styleDescription}\n\nText to speak: ${text.trim()}`
            }
          ]
        }
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName }
          }
        }
      }
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error('No audio data returned from Gemini TTS model');
    }

    // Gemini TTS normally returns 24 kHz 16-bit mono PCM, not a WAV container.
    // Wrap PCM in a WAV header so HTMLAudioElement can decode it.
    const raw = Buffer.from(base64Audio, 'base64');
    const mime = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || '';
    let wav = raw;
    if (!mime.includes('wav') && raw.toString('ascii', 0, 4) !== 'RIFF') {
      const header = Buffer.alloc(44);
      header.write('RIFF', 0);
      header.writeUInt32LE(36 + raw.length, 4);
      header.write('WAVE', 8);
      header.write('fmt ', 12);
      header.writeUInt32LE(16, 16);
      header.writeUInt16LE(1, 20);
      header.writeUInt16LE(1, 22);
      header.writeUInt32LE(24000, 24);
      header.writeUInt32LE(48000, 28);
      header.writeUInt16LE(2, 32);
      header.writeUInt16LE(16, 34);
      header.write('data', 36);
      header.writeUInt32LE(raw.length, 40);
      wav = Buffer.concat([header, raw]);
    }
    return res.status(200).json({
      success: true,
      audio: wav.toString('base64'),
      mimeType: 'audio/wav',
      voiceName,
      source: 'gemini_tts'
    });
  } catch (err: unknown) {
    const error = err as Error;
    return res.status(500).json({
      error: error.message || 'TTS generation failed',
      fallback: true
    });
  }
}
