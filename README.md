
# 🤖 Discord AI Chatbot with OpenAI & Express

A Discord bot powered by **OpenAI GPT** and **Discord.js**, deployed on **Render** with an Express server to keep it alive.
The bot responds to messages in your server using AI while keeping responses under 1500 characters (to avoid Discord limits).

---

## 🚀 Features

* ⚡ Built with **Discord.js v14**
* 🧠 AI responses using **OpenAI API**
* 🖥️ Lightweight **Express server** (for Render deployment)
* ⏱️ Auto-typing indicator before sending replies
* 🛡️ Limits long responses to avoid Discord's 2000-char message cap
* 🌐 Deployable on **Render Free Plan**

---

## 📂 Project Structure

```
.
├── index.js        # Main bot + express server code
├── package.json    # Dependencies & scripts
├── .env            # Environment variables (ignored by Git)
└── README.md       # Project documentation
```

---

## ⚙️ Setup

### 1. Clone Repo

```bash
git clone https://github.com/Swati-jain123/discord_bot.git
cd discord_bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root folder:

```env
DISCORD_TOKEN=your_discord_bot_token
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

### 4. Run Locally

```bash
node index.js
```

If everything works, you should see:

```
🌐 Express server is running on port 3000
```

And your bot will be online in your Discord server 🎉

---

## ☁️ Deploy on Render

1. Push your code to GitHub.
2. Go to [Render](https://render.com/).
3. Create a **New Web Service**.
4. Connect your GitHub repo.
5. Set **Build Command**:

   ```bash
   npm install
   ```
6. Set **Start Command**:

   ```bash
   node index.js
   ```
7. Add **Environment Variables** in Render dashboard:

   * `DISCORD_TOKEN`
   * `OPENAI_API_KEY`
   * `PORT` (e.g., 3000)
8. Deploy 🎉

---

## 🔧 Commands

* **Ping Command**: `/ping` → Bot replies `Pong!!`
* **Chat**: Just type any message, bot replies with AI response.

---

## 📝 Notes

* Keep responses under **2000 characters** to avoid Discord errors.
* Free Render plan requires an **Express server** (already included).
* If deploying to another host (Heroku, Railway, etc.), no changes needed.

---

## 📜 License

MIT License © 2025

