import express from "express";
import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// ---- OpenAI Setup ----
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ---- Express Setup ----
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Discord bot is running on Render!");
});

app.listen(PORT, () => {
  console.log(`🌐 Express server is running on port ${PORT}`);
});

// ---- Discord Client ----
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ---- Handle Messages ----
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  try {
    await message.channel.sendTyping();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Always keep responses under 1500 characters.",
        },
        { role: "user", content: message.content },
      ],
    });

    const reply = response.choices[0].message.content || "⚠️ No response";
   

    await message.reply(reply);
  } catch (error) {
    console.error("OpenAI Error:", error);
    await message.reply("⚠️ Oops, I had trouble processing your request.");
  }
});

// ---- Interaction Command Example ----
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!!");
  }
});

// ---- Login ----
client.login(process.env.DISCORD_TOKEN);
