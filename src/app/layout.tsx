import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaSify - Build Your SaaS Faster Than Ever",
  description: "The all-in-one platform that helps you launch, scale, and grow your SaaS business with powerful tools and analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <Script type="text/javascript" async src="https://cdn.mida.so/js/optimize.js?key=E3jxwZ6ldLqbzYg90mMX8O" strategy="beforeInteractive"></Script> 
    </head>
 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
