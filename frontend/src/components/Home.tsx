import About from "@/components/About";
import Brands from "@/components/Brands";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import Signup from "@/components/Signup";
import Solutions from "@/components/Solutions";
import Working from "@/components/Working";

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <div className="space-y-16 ">
        <div className="snap-center"><Hero /></div>
        <div className="snap-center"><Brands /></div>
        <div className="snap-center"><About /></div>
        <div className="snap-center"><Solutions /></div>
        <div className="snap-center"><Working /></div>
        <div className="snap-center"><Insights /></div>
        <div className="snap-center"><FAQ /></div>
        <div className="snap-center"><Signup /></div>
      </div>
    </main>
  );
}
