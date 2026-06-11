const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a React component generator. Generate ONLY valid React functional components using Tailwind CSS.

CRITICAL RULES:
- Return ONLY raw JavaScript code. No markdown, no backticks, no explanation.
- Start with exactly: function Component() {
- End with exactly: }
- No imports, no exports.
- Use only Tailwind CSS classes. No inline styles.
- Use only standard HTML elements. No external libraries.
- For interactive components use React.useState like this: const [open, setOpen] = React.useState(false)
- Do NOT use import or const outside the function body.
- Use React.useState NOT useState (no imports allowed).

SVG RULES - CRITICAL:
- ALL SVG attributes must use React camelCase ONLY.
- strokeLinecap not stroke-linecap
- strokeLinejoin not stroke-linejoin  
- strokeWidth not stroke-width
- fillRule not fill-rule
- clipRule not clip-rule
- viewBox is already camelCase, keep as viewBox
- NEVER use SVG icons for simple UI elements like avatars or logos.
- For avatars use a colored div with initials: <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">JD</div>
- For logos use text or emoji, not SVG.
- Only use SVG when absolutely necessary like charts or complex illustrations.
- Keep SVG paths simple and tested.

INTERACTIVITY PATTERN:
function Component() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  return (
    <div>...</div>
  );
}

Make it visually stunning with gradients, shadows, and modern design. Use realistic placeholder content.`;

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const stream = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 4096,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a React component with Tailwind CSS for: ${prompt}. Make it visually stunning and production-ready.`,
        },
      ],
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

app.post("/api/enhance", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `You are a UI component prompt enhancer. Take this rough prompt and rewrite it into a clear, specific component description for a React component.

IMPORTANT RULES:
- Keep it concise, 2 to 3 sentences maximum.
- Do NOT suggest complex SVG icons. Use emoji or text alternatives instead.
- Do NOT add overly complex interactivity requirements.
- Focus on layout, colors, and visual design.
- Keep interactive elements simple and achievable.

Original prompt: "${prompt}"

Return ONLY the enhanced prompt. No explanation, no preamble.`,
        },
      ],
    });

    const enhanced = completion.choices[0]?.message?.content || prompt;
    res.json({ enhanced });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "ComponentCraft API is running" });
});

app.listen(PORT, () => {
  console.log(`ComponentCraft backend running on port ${PORT}`);
});
