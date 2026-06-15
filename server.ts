import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily, with standard safety fallback for missing keys
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables.');
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    // Map history to chat contents format if present
    const formattedHistory = (chatHistory || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Start a chat session
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: `You are "Mukesh Sir's AI Coding Assistant," an interactive, knowledgeable, and polite virtual tutor on the personal education portal of Mukesh Kumar Yadav (a top-tier Computer Science Teacher with 10+ years of experience).
Your goal is to help students learn coding easily, troubleshoot errors, and prepare for exams (especially CBSE/Board Class 9, 10, 11, and 12 Computer Science, covering C, Python, Web Development, Java, SQL, and Boolean Algebra).
Answer student questions directly, explain coding concepts using short and clean Python/C snippets if applicable, and maintain a highly supportive and motivational educational tone. Highlight that Mukesh Sir is always available to resolve doubts in class!`,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message || String(error),
    });
  }
});

// Serve frontend assets
if (process.env.NODE_ENV !== 'production') {
  // Use dynamic imports to prevent loading Vite dependency in production
  import('vite').then((viteModule) => {
    viteModule.createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    }).then((vite) => {
      app.use(vite.middlewares);
    });
  });
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
