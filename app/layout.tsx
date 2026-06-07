import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Horizon | Software Development & Business Management Solutions",
  description: "Apex Horizon is a precision software development company specializing in custom software, web development, ERP systems, and the Apex Management offline billing software.",
  keywords: [
    "apex horizon", "apexhorizon", "apex horizon software", "apex horizon technologies",
    "apex horizon india", "apex horizon rajkot", "software company in rajkot",
    "software developer", "software development company", "web development company",
    "mobile app development company", "custom software development", "full stack developer",
    "MERN stack developer", "Next.js developer", "SaaS development company",
    "software developer in rajkot", "web developer in rajkot", "software agency in gujarat",
    "custom software company india", "business management software", "erp software", "crm software"
  ],
  authors: [{ name: "Apex Horizon" }],
  openGraph: {
    title: "Apex Horizon | Software Development & Business Management Solutions",
    description: "Precision software studio designing subscription-ready products and engineered local integrations.",
    url: "https://apexhorizon.in",
    siteName: "Apex Horizon",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Horizon | Software Development",
    description: "Precision software studio designing subscription-ready products.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
