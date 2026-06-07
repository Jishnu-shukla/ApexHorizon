import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex Management – Offline Billing, Inventory & WhatsApp Business Software",
  description: "Manage billing, inventory, stock tracking, GST invoices and WhatsApp notifications from a single offline-first business management platform.",
  keywords: [
    "apex management", "apex management software", "apex management system", 
    "apex management app", "apex management erp", "bill management system", 
    "billing software", "invoice management software", "gst billing software", 
    "gst invoice software", "retail billing software", "offline billing software", 
    "business billing application", "invoice generator software", 
    "billing and inventory software", "inventory management software", 
    "stock management software", "whatsapp inventory management", 
    "inventory tracking software", "warehouse management software", 
    "stock application", "stock control software", "stock tracking system", 
    "inventory application", "offline inventory software", "small business software", 
    "retail management software", "shop management software", "store management software", 
    "business automation software", "small business ERP"
  ],
  openGraph: {
    title: "Apex Management – Offline Billing, Inventory & WhatsApp Business Software",
    description: "Manage billing, inventory, stock tracking, GST invoices and WhatsApp notifications from a single offline-first business management platform.",
    url: "https://apexhorizon.in/products/ApexManagement",
    siteName: "Apex Horizon",
    images: [
      {
        url: "/dashboard.png",
        width: 1200,
        height: 630,
        alt: "Apex Management Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function ApexManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
