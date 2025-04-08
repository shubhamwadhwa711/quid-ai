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
    <main className="min-h-screen max-w-md text-white">
      <div className="space-y-16">
        {/* Hero Section */}
        <Hero />
        {/* Brands */}
        <Brands />
        {/* What & Why QuidAI */}
        <About />
        {/* The Ultimate AI solutions for your businesses */}
        <Solutions />
        {/* How it works */}
        <Working />
        {/* Quid AI Insights */}
        <Insights />
        {/* FAQ */}
        <FAQ />
        {/* Signup section */}
        <Signup />
      </div>
    </main>
  );
}
