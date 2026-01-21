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
        id="flicker-prevention"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Create anti-flicker style element
            var style = document.createElement("style");
            style.id = "abhide";
            style.innerHTML = "body{opacity:0}";
            document.head.appendChild(style);

            // Load Mida script and wait for it to load
            var script = document.createElement('script');
            script.src = 'https://cdn.mida.so/js/optimize.js?key=E3jxwZ6ldLqbzYg90mMX8O';
            script.onload = function() {
              // Mida script has loaded, remove the anti-flicker style
              var styleElement = document.getElementById("abhide");
              if (styleElement) {
                styleElement.parentNode.removeChild(styleElement);
              }
            };
            script.onerror = function() {
              // Fallback: remove style after 3 seconds if script fails to load
              setTimeout(function() {
                var styleElement = document.getElementById("abhide");
                if (styleElement) {
                  styleElement.parentNode.removeChild(styleElement);
                }
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
 
      <body>
        {children}
      </body>
    </html>
  )
}
