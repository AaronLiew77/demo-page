import "./globals.css";
import Script from "next/script";


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
            !function(h,i,d,e){
              var t,n=h.createElement("style");
              n.id=e;
              n.innerHTML="body{opacity:0}";
              h.head.appendChild(n);
              t=d;
              i.rmfk=function(){
                console.log('rmfk called');
                var t=h.getElementById(e);
                t && t.parentNode.removeChild(t)
              };
              setTimeout(i.rmfk,t)
            }(document,window,timeout,"abhide");
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
