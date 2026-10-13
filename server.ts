import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// In-memory audio cache: Map<textKey, { audioBase64: string, mimeType: string }>
const audioCache = new Map<string, { audioBase64: string; mimeType: string }>();

// Cache directory on disk for persistent caching across restarts
const CACHE_DIR = path.join(__dirname, 'public', 'audio_cache');
try {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Could not create cache dir:', e);
}

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

/**
 * Hash simple string for cache filename
 */
function getHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

/**
 * POST /api/tts
 * Generates natural audio using Gemini 3.8 Flash Lite TTS model
 */
app.post('/api/tts', async (req, res) => {
  try {
    const { text, lang = 'vi', speaker = 'teacher', style } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Missing or invalid text parameter' });
      return;
    }

    const trimmedText = text.trim();
    const cacheKey = `${lang}_${speaker}_${trimmedText}`;

    // 1. Check in-memory cache
    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      res.json({
        success: true,
        audio: cached.audioBase64,
        mimeType: cached.mimeType,
        source: 'cache_memory'
      });
      return;
    }

    // 2. Check disk cache
    const diskFileName = `tts_${getHash(cacheKey)}.wav`;
    const diskPath = path.join(CACHE_DIR, diskFileName);
    if (fs.existsSync(diskPath)) {
      try {
        const fileBuf = fs.readFileSync(diskPath);
        const base64 = fileBuf.toString('base64');
        audioCache.set(cacheKey, { audioBase64: base64, mimeType: 'audio/wav' });
        res.json({
          success: true,
          audio: base64,
          mimeType: 'audio/wav',
          source: 'cache_disk'
        });
        return;
      } catch (err) {
        console.warn('Failed to read disk cache:', err);
      }
    }

    // 3. Check Gemini API client
    if (!ai || !apiKey) {
      res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on server',
        fallback: true
      });
      return;
    }

    // Configure Voice based on speaker and language
    // Prebuilt voices: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
    // 'Kore' is a warm, pleasant female voice - ideal for teacher and An
    // 'Puck' is a lively, youthful voice - ideal for Minh
    let voiceName = 'Kore';
    if (speaker === 'minh') {
      voiceName = 'Puck';
    }

    let speechPrompt = trimmedText;
    let styleDescription =
      style ||
      (lang === 'en'
        ? 'Speak clearly with accurate English pronunciation for primary school children.'
        : 'Speak in natural Vietnamese with a warm, gentle, expressive female primary-school teacher voice. Clear pronunciation with authentic Vietnamese tones, cheerful intonation, moderate child-friendly pacing.');

    if (speaker === 'minh') {
      styleDescription =
        'Speak in Vietnamese with a cheerful, energetic 7-year-old schoolboy voice.';
    } else if (speaker === 'an') {
      styleDescription =
        'Speak in Vietnamese with a sweet, smart, friendly 7-year-old schoolgirl voice.';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: speechPrompt,
              speechMetadata: {
                style: styleDescription
              }
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

    // Save to memory cache
    audioCache.set(cacheKey, { audioBase64: base64Audio, mimeType: 'audio/wav' });

    // Save to disk cache asynchronously
    try {
      const buf = Buffer.from(base64Audio, 'base64');
      fs.writeFileSync(diskPath, buf);
    } catch (e) {
      console.warn('Could not write disk cache:', e);
    }

    res.json({
      success: true,
      audio: base64Audio,
      mimeType: 'audio/wav',
      voiceName,
      source: 'gemini_tts'
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error generating Gemini TTS:', error);
    res.status(500).json({
      error: error.message || 'TTS generation failed',
      fallback: true
    });
  }
});

/**
 * Health & Config Status endpoint
 */
app.get('/api/tts/status', (req, res) => {
  res.json({
    hasApiKey: !!process.env.GEMINI_API_KEY,
    cacheCount: audioCache.size,
    model: 'gemini-3.8-flash-lite-tts',
    status: 'ready'
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Our Family Home server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
