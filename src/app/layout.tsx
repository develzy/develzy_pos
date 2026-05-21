import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEVELZY POS | Aplikasi Kasir Modern Premium",
  description: "Aplikasi Kasir Modern untuk Toko, UMKM, Cafe, Bengkel, Retail, dan Usaha Modern. Aplikasi Permanen, Usaha Makin Paten.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} font-sans h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
