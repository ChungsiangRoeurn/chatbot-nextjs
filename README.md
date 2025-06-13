# 🤖 Chatbot App

A modern AI chatbot web application powered by **Next.js 14**, **Prisma**, **TailwindCSS**, and **Google Gemini API**. This project uses **SQLite** for local development and Prisma ORM for database interaction.

## 🚀 Features

* ✨ Chat with AI using the Google Gemini API
* 🧠 Streaming responses (coming soon)
* 🗂️ Chat history stored with Prisma ORM
* 🎨 Beautifully styled with TailwindCSS & ShadCN UI
* ✅ TypeScript & ESLint support

## 🧰 Tech Stack

* **Frontend:** Next.js 14, React 18
* **Styling:** TailwindCSS, ShadCN UI, Radix UI
* **Backend:** Google Gemini API
* **Database:** SQLite
* **ORM:** Prisma

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/ChungsiangRoeurn/chatbot-app.git
cd chatbot-app
```

### 2. Install Dependencies

You can use **pnpm**, **npm**, or **yarn** — choose one that fits your setup.

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Setup Environment Variables

1. Create a Google Gemini account and get your API key
2. Copy the environment variables:

```bash
cp .env.example .env
```

3. Update your `.env` file with your credentials:

```env
GEMINI_API_KEY=your_gemini_api_key_here
AI_PROVIDER=gemini
```

### 4. Setup Prisma ORM

```bash
# Generate Prisma client
pnpm prisma generate

# Push database schema
pnpm prisma db push

# (Optional) Open Prisma Studio to view your database
pnpm prisma db studio
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open your browser and go to `http://localhost:3000` (or your configured port).

## 📁 Project Structure

```
chatbot-app/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── .env.example
├── package.json
└── README.md
```

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
AI_PROVIDER=gemini

# Database
DATABASE_URL="file:./dev.db"
```

## 🚀 Deployment

This project can be deployed on various platforms:

* **Vercel** (recommended for Next.js)
* **Netlify**
* **Railway**
* **Docker**

For production deployment, make sure to:
1. Set up your environment variables
2. Use a production database (PostgreSQL, MySQL, etc.)
3. Update your `DATABASE_URL` accordingly

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

* Google Gemini API for AI capabilities
* Vercel for the amazing Next.js framework
* Prisma team for the excellent ORM
* ShadCN UI for beautiful components

---

Built with ❤️ by [ChungsiangRoeurn](https://github.com/ChungsiangRoeurn)
