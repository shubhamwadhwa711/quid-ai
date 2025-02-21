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
    <main
      className={`min-h-screen text-white bg-gradient-to-tr from-black via-blue-950 to-black`}
    >
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="space-y-16 text-center">
          {/* Hero Section */}
          <Hero />
          {/* Brands */}
          <Brands />
          {/* What & Why QuidAI */}
          <About />
          {/*  The Ultimate AI solutions for your bussinesses*/}
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
      </div>
    </main>
  );
}
