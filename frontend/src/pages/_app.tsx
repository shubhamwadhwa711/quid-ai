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
          <div className="relative min-h-screen ">
            {/* Background gradients */}
            <div className="absolute  inset-0 bg-gradient-to-br from-black via-[#0F0F30] to-[#0F0F30]"></div>

            {/* Dotted pattern overlay */}

            {/* Main content */}
            <div className="relative max-w-md w-full justify-self-center z-10">
              <Navbar />
              <Component {...pageProps} />
              <BottomNav />
            </div>
          </div>
        )}
      </Provider>
    </SessionProvider>
  );
}
