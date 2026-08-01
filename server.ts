import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Plant Doctor assistant powered by Gemini
  app.post("/api/plant-doctor", async (req, res) => {
    try {
      const { message, plantContext, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Friendly fallback response when API key is not configured in environment
        return res.json({
          reply: `🌿 **Dr. Green (Amar Gaon Nursery Expert)**:\n\nThank you for reaching out! Here is general advice for your query:\n\n• **Watering**: Ensure top 1-2 inches of soil feel dry before deep watering. In Guwahati humid summers, check soil moisture daily.\n• **Sunlight**: Keep shade-loving indoor plants away from direct noon sun to prevent leaf scorching.\n• **Soil & Nutrients**: Feed with organic Vermicompost or Neem Cake every 3-4 weeks.\n\n*For direct instant support, visit our nursery at Rani gate, Azara, Guwahati or call us at 080112 53258!*`
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are Dr. Green, the expert master botanist and plant doctor at Amar Gaon Nursery located at Rani gate, Azara, Guwahati, Assam 781017 (Contact: 080112 53258).
You are a warm, helpful expert in tropical plants, house plants, native Assam flora (such as Kapou Phool / Foxtail Orchid, Kaji Nemu / Assam Lemon), flowering shrubs, lawn care, soil nutrition, and pest remedies tailored for Assam and North East India's humid subtropical climate.
Provide practical, easy-to-follow, structured advice with bullet points where appropriate. If asked about purchasing plants or landscaping, recommend visiting Amar Gaon Nursery in Rani gate, Azara, Guwahati or calling 080112 53258.`;

      const promptContext = plantContext
        ? `[User context plant: ${plantContext}]\n\nUser Question: ${message}`
        : `User Question: ${message}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptContext,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Thank you for contacting Amar Gaon Nursery! Our agronomists recommend checking soil moisture and light levels. Feel free to visit our Rani gate, Azara nursery or call 080112 53258 for immediate assistance.";

      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.json({
        reply: "🌿 **Dr. Green Advice**:\n\n• For yellow leaves, check if the soil is waterlogged or lacks nitrogen.\n• For pests like mealybugs or aphids, spray diluted Neem oil solution (5ml neem oil + 2ml liquid soap in 1L warm water) every 5 days.\n• Feel free to call Amar Gaon Nursery directly at **080112 53258** or visit us at Rani gate, Azara, Guwahati for personalized plant checkup!"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Amar Gaon Nursery" });
  });

  // Vite development middleware or production static server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Amar Gaon Nursery Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
