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
            !function(){
              var t=3e3,e=document.createElement("style");
              e.id="abhide";
              e.innerHTML="body{opacity:0 !important}";
              document.head.appendChild(e);
              var i=setInterval(function(){
                document.getElementById("abhide")||(document.body.style.opacity="",clearInterval(i),clearTimeout(o))
              },50);
              var o=setTimeout(function(){
                var t=document.getElementById("abhide");
                t&&t.parentNode&&t.parentNode.removeChild(t);
                document.body.style.opacity="";
                clearInterval(i)
              },t)
            }();
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
