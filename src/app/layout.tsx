import "./globals.css";
import Script from "next/script";
import { MidaScript } from "mida-nextjs";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ opacity: 0 }}>
    <head>
      {/* <MidaScript projectKey="E3jxwZ6ldLqbzYg90mMX8O" useAntiFlicker={true} antiFlickerTimeout={3000}/> */}

      <style dangerouslySetInnerHTML={{
        __html: `
          html { opacity: 0 !important; }
        `
      }} />
      
      <Script 
  id="flicker-prevention"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        var timeout = 3000;
        var removeHide = function() {
          document.documentElement.style.opacity = '1';
          var styles = document.querySelectorAll('style');
          styles.forEach(function(style) {
            if (style.innerHTML.includes('opacity: 0')) {
              style.remove();
            }
          });
        };
        
        // Remove after timeout (Mida should load before this)
        setTimeout(removeHide, timeout);
        
        // Also try to detect when Mida is ready
        if (window.mida) {
          removeHide();
        } else {
          var checkMida = setInterval(function() {
            if (window.mida) {
              clearInterval(checkMida);
              removeHide();
            }
          }, 100);
          setTimeout(function() { clearInterval(checkMida); }, timeout);
        }
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
 
      <body>
        {children}
      </body>
    </html>
  )
}
