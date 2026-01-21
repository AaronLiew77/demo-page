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
      {/* <MidaScript projectKey="E3jxwZ6ldLqbzYg90mMX8O" useAntiFlicker={true} antiFlickerTimeout={3000}/> */}

    
      <Script dangerouslySetInnerHTML={{
        __html: `
          !function(){var e="body {opacity: 0 !important;}",t=document.createElement("style");t.type="text/css",t.id="page-hide-style",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.head.appendChild(t),window.rmo=function(){var e=document.getElementById("page-hide-style");e&&(e.parentNode.removeChild(e),document.body.style.opacity="")},setTimeout(window.rmo,3e3)}();
        `
      }} />


      {/* <Script 
        id="flicker-prevention"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var timeout = 1000; // Timeout value to remove the flicker (in milliseconds)
            !function(h,i,d,e){var t,n=h.createElement("style");n.id=e,n.innerHTML="body{opacity:0}",h.head.appendChild(n),t=d,i.rmfk=function(){var t=h.getElementById(e);t&&t.parentNode.removeChild(t)},setTimeout(i.rmfk,t)}(document,window,timeout,"abhide");
          `
        }}
      /> */}
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
