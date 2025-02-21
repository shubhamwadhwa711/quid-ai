import { BottomNav } from "@/components/bottom-nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <BottomNav />
    </div>
  );
}
