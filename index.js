
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


dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });


client.on('messageCreate',async(message)=>{
  if(message.author.bot)return;
  try{
    await message.channel.sendTyping();
    const response=await openai.chat.completions.create({
      model:"gpt-4o-mini",
      
      messages:[
        { role: "system", content: "You are a helpful assistant. Always keep responses under 1500 characters." },
        {role:"user",content:message.content}],
    });

    const reply=response.choices[0].message.content;
    
    await message.reply(reply);
  }
  catch(error){
    console.log("OpenAi Error : ",error);
    await message.reply("⚠️ Oops, I had trouble processing your request.");
  }
});


client.on("interactionCreate",(interaction)=>{
  interaction.reply("Pong!!");
})

client.login(process.env.DISCORD_TOKEN);
