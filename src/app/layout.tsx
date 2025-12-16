import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { MidaScript } from "mida-nextjs";


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
      {/* <MidaScript projectKey="E3jxwZ6ldLqbzYg90mMX8O" useAntiFlicker={true} antiFlickerTimeout={3000}/> */}
      {/* <Script 
        id="flicker-prevention"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var timeout = 3000; // Timeout value to remove the flicker (in milliseconds)
            !function(h,i,d,e){var t,n=h.createElement("style");n.id=e,n.innerHTML="body{opacity:0}",h.head.appendChild(n),t=d,i.rmfk=function(){var t=h.getElementById(e);t&&t.parentNode.removeChild(t)},setTimeout(i.rmfk,t)}(document,window,timeout,"abhide");
          `
        }}
      /> */}
      <Script 
        src="https://cdn.mida.so/js/optimize.js?key=E3jxwZ6ldLqbzYg90mMX8O" 
        strategy="beforeInteractive"
      />
      {/* <Script 
        id="preconnect-mida"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = 'https://api-us.mida.so';
            document.head.appendChild(link);
          `
        }}
      /> */}
  
    </head>
 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
