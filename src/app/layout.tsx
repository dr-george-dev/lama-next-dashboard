import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// fixed the error coming from .inter by adding this line - dr-george
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unipod Innovation Hub Training Management System",
  description: "Next.js School Management System",
};

//Displays on all pages - by dr-george
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
