<div align="center">
  <img src="public/logo.png" alt="Apex Horizon Logo" width="400" />

  # Apex Horizon

  **Precision Software Studio | Next-Generation Business Systems**

  [![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
</div>

---

## 🌌 Overview

Welcome to the **Apex Horizon** official platform. We are a premier software development studio specializing in engineering ultra-fast, highly reliable, and subscription-ready business management solutions.

This repository holds the core Next.js frontend application for our company portal, which showcases our services, captures leads, and distributes our flagship products.

## 🚀 Flagship Products

### ApexManagement
The ultimate offline-first retail and billing terminal. 
- **100% Offline Architecture:** Lightning-fast local JSON data storage.
- **Automated CA Ledgers:** Native Excel (.xlsx) generation via Apache POI.
- **WhatsApp Integration:** Built-in communication gateway for seamless customer receipts.
- **Zero-Setup Executable:** Fully embedded Java environment bundled via Launch4j and jpackage.

## 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ORM)
- **Deployment:** Vercel (Recommended)

## 🛠️ Getting Started

First, install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Configure your environment variables inside a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/app` - Next.js App Router pages, global layouts, and robust SEO configurations.
- `/app/api` - Backend API routes (including our MongoDB-backed lead generation funnel).
- `/components` - Reusable UI components (Navbars, Modals, Device Mockups).
- `/models` - Mongoose database schemas.
- `/public` - Static assets, downloads, and the dynamic Markdown API endpoint.

---

<div align="center">
  <i>Engineered for Dominance. Built for Scale.</i><br>
  <b>© 2026 Apex Horizon. All rights reserved.</b>
</div>
