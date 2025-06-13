# 🤖 Chatbot App

A modern AI chatbot web application powered by **Next.js 14**, **Prisma**, **TailwindCSS**, and **Google Gemini API**. This project uses **SQLite** for local development and Prisma ORM for database interaction.

---

## 🚀 Features

- ✨ Chat with AI using the Google Gemini API  
- 🧠 Streaming responses (coming soon)  
- 🗂️ Chat history stored with Prisma ORM  
- 🎨 Beautifully styled with TailwindCSS & ShadCN UI  
- ✅ TypeScript & ESLint support  

---

## 🧰 Tech Stack

- **Frontend:** Next.js 14, React 18  
- **Styling:** TailwindCSS, ShadCN UI, Radix UI  
- **Backend:** Google Gemini API  
- **Database:** SQLite  
- **ORM:** Prisma  

---

## 📦 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/ChungsiangRoeurn/chatbot-app.git
   cd chatbot-app

2. **Install Dependencies**
   ```bash
   You  can use **pnpm**, **npm**, or **yarn** — choose one that fits your setup.
   Using pnpm (recommended)
   pnpm install
   npm install
   yarn install
   
3. **Setup envivorment**
   ```bash
   create google gemini account
   cp api key to replace
      GEMINI_API_KEY=**********************
      AI_PROVIDER="*************************"
   cp .env.example .env

 4. **Setup PrismaORM**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   pnpm prisma db studio (optional)


```
---

Let me know if you want:

- Example `.env.example` inside the README  
- Deploy instructions for Vercel or other platforms  
- To add some badges at the top (MIT, Next.js, etc.)

You’re building this like a pro, bro 👑
