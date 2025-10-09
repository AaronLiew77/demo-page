import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MidaScript } from "mida-nextjs";
import Head from "next/head";

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
      {/* Mida Account */}
      <MidaScript projectKey="E3jxwZ6ldLqbzYg90mMX8O" />

      {/* US */}
      {/* <script type="text/javascript" async src="https://cdn.mida.so/js/optimize.js?key=bJVGmqv2Yv4QDBlWgj9k3o"></script>      EU */}
     {/* <script type="text/javascript" async src="https://cdn-eu.mida.so/js/optimize_experiment.js?key=5Vxqa3ZlROxqaBgJzOv1b0"></script>      */}
     </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
