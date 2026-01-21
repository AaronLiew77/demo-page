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
            // Load Mida script dynamically and wait for it to load
            const script = document.createElement('script');
            script.src = 'https://cdn.mida.so/js/optimize.js?key=E3jxwZ6ldLqbzYg90mMX8O';
            script.onload = function() {
              // Mida script has loaded, remove the opacity
              document.body.style.opacity = '';
            };
            script.onerror = function() {
              // Fallback: remove opacity after 3 seconds if script fails to load
              setTimeout(() => {
                document.body.style.opacity = '';
              }, 3000);
            };
            document.head.appendChild(script);
          `
        }}
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
