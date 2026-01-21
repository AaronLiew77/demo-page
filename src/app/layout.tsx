import "./globals.css";
import Script from "next/script";
import { MidaScript } from "mida-nextjs";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <Script
        id="anti-flicker"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var timeout = 3000; // Timeout value to remove the flicker (in milliseconds)
            window.rmfk = function() {
              document.body.style.opacity = '1';
            };
            setTimeout(window.rmfk, timeout);
          `
        }}
      />
      <Script 
        src="https://cdn.mida.so/js/optimize.js?key=E3jxwZ6ldLqbzYg90mMX8O" 
        strategy="beforeInteractive"
      />
      <Script 
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
      />
  
    </head>
 
      <body style={{ opacity: 0 }}>
        {children}
      </body>
    </html>
  )
}
