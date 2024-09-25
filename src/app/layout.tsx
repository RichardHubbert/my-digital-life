import type { Metadata } from "next";
import {Inter, Calistoga} from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap',
});

const calistoga = Calistoga({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: '--font-calistoga',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Created with the help of Frontend Tribe",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${calistoga.variable}`}>
      <body className="bg-gray-900 text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
