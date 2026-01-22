# Beexel Posters

<div align="center">
  <img src="public/icon.png" alt="Beexel Posters Logo" width="120" />
  <h1>Creativity Unleashed</h1>
  <p>The most advanced AI poster generator in Kenya. Built for speed, quality, and complete creative freedom.</p>
</div>

## 🚀 Overview

Beexel Posters is a cutting-edge web application tailored for the Kenyan market, allowing businesses and creators to generate professional-quality posters in seconds using AI. We prioritize speed, local relevance, and seamless payments via M-PESA.

Key philosophies:
- **Consistency Wins**: Enabling daily content creation.
- **Democratized Design**: Agency-level quality for everyone.
- **Local Integration**: Native M-PESA support.

## ✨ Features

- **AI-Powered Generation**: Create posters from text prompts in < 30 seconds.
- **Smart Branding**: Consistency in colors and layouts.
- **M-PESA Integration**: Buy tokens instantly via Intasend with automatic verification.
- **Glassmorphic UI**: A modern, premium aesthetic (Clash Display typography).
- **Responsive Design**: Mobile-first approach for creators on the go.
- **Project Management**: Save, edit, and export your designs in 4K.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: PostgreSQL (via Prisma ORM)
- **Payments**: Intasend API
- **AI/Rendering**: Custom AI Pipeline (Backend)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Intasend Account

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/beexel-posters.git
    cd beexel-posters
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/beexel"
    
    # Auth (NextAuth or Custom)
    NEXTAUTH_SECRET="your-secret"
    
    # Intasend Payments
    INTASEND_PUBLISHABLE_KEY="your-pub-key"
    INTASEND_SECRET_KEY="your-secret-key"
    
    # AI Service
    AI_SERVICE_URL="https://api.beexel.com/generate"
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🏗️ Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (public)/     # Marketing pages (Home, Pricing, About)
│   ├── (app)/        # App pages (Render, Dashboard)
│   └── api/          # Backend API routes
├── components/       # Reusable React components
│   ├── ui/           # Primitive UI components
│   ├── layout/       # Header, Footer
│   └── payment/      # Payment modals & logic
├── lib/              # Utilities, DB client, API helpers
└── types/            # TypeScript definitions
```

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ in Nairobi by Beexel.
</p>
