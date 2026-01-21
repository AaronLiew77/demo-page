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
      {/* Anti-flicker script with rmfk function for Optimize.js */}
      <Script
        id="anti-flicker"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var timeout = 3000;
              var timeoutId;
              
              // Function to remove the flicker
              window.rmfk = function() {
                if (timeoutId) {
                  clearTimeout(timeoutId);
                }
                document.body.style.display = '';
              };
              
              // Set the fallback timeout
              timeoutId = setTimeout(window.rmfk, timeout);
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
