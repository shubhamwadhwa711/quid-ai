import { Provider } from "react-redux";
import { store } from "@/store/store";
import { BottomNav } from "@/components/bottom-nav";
import Navbar from "@/components/navbar";
import { PageLoader } from "@/components/PageLoader";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2000);
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = () => setIsPageLoading(true);
    const handleRouteChangeComplete = () => setIsPageLoading(false);
    const handleRouteChangeError = () => setIsPageLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PageLoader isLoading={isPageLoading} />

        {showSplash ? (
          <div className="flex items-center justify-center h-screen bg-black">
            <img src="/quid-icon.png" alt="Splash Screen" className="w-64" />
          </div>
        ) : (
          <div className="relative min-h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0F0F30] to-[#0F0F30]"></div>

            <div className="relative max-w-md mx-auto w-full justify-self-center z-10">
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

App.getInitialProps = async ({ ctx }: any) => {
  const session = await getSession(ctx);
  return {
    pageProps: {
      session,
    },
  };
};
