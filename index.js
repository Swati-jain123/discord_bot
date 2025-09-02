import express from "express";
import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 3000;

// Small health check route
app.get("/", (req, res) => {
  res.send("Bot is running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ---- Discord bot ----
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message.content }],
    });

    let reply = response.choices[0].message.content || "⚠️ No response";
    if (reply.length > 1900) reply = reply.slice(0, 1900) + "...";

    await message.reply(reply);
  } catch (error) {
    console.error("OpenAI Error:", error);
    await message.reply("⚠️ Oops, something went wrong.");
  }
});

client.login(process.env.DISCORD_TOKEN);
