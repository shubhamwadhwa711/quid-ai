import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Link the PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Set a theme color */}
        <meta name="theme-color" content="#F97316" />

        {/* Enable standalone PWA mode */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Apple Touch Icon (for iOS) */}
        <link rel="apple-touch-icon" href="/quid-icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
