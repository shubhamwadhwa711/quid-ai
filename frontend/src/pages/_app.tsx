// import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { BottomNav } from "@/components/bottom-nav";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [showSplash, setShowSplash] = useState(true);

  console.log("session", session);
  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2000); // Show splash screen for 2 seconds
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {showSplash ? (
          <div className="flex items-center justify-center h-screen bg-black">
            <img src="/quid-icon.png" alt="Splash Screen" className="w-64" />
          </div>
        ) : (
          <div className="bg-gradient-to-r from-black via-blue-950 to-black min-h-screen">
            <Navbar />
            <Component {...pageProps} />
            <BottomNav />
          </div>
        )}
      </Provider>
    </SessionProvider>
  );
}
