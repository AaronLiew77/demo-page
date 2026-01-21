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
      {/* Anti-flicker script - creates #abhide element for Optimize.js */}
      <Script
        id="anti-flicker"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var timeout = 3000;
              var timeoutId;
              
              // Hide body directly
              document.documentElement.style.cssText = 'body{display:none !important}';
              
              // Create style element with id="abhide" that Optimize.js expects
              var style = document.createElement('style');
              style.id = 'abhide';
              style.innerHTML = 'body{display:none !important}';
              document.head.appendChild(style);
              
              // Fallback function to remove the style if Optimize.js doesn't call mida.rmfk()
              var removeFallback = function() {
                var el = document.getElementById('abhide');
                if (el && el.parentNode) {
                  el.parentNode.removeChild(el);
                  console.log('[Anti-Flicker] Removed via fallback timeout');
                }
              };
              
              console.log('[Anti-Flicker] Created #abhide element, waiting for Optimize.js or timeout');
              // Set the fallback timeout
              timeoutId = setTimeout(removeFallback, timeout);
            })();
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
 
      <body style={{ display: 'none' }}>
        {children}
      </body>
    </html>
  )
}
