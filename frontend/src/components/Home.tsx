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
      className="min-h-screen  text-white bg-no-repeat bg-top"
      style={{
        backgroundImage: `
          linear-gradient(to top, rgba(13, 18, 46, 0.8), rgba(13, 18, 46, 0.6)),
          url('https://s3-alpha-sig.figma.com/img/9acc/0645/13c9250adf9491d73b0af95645eac1e2?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WU~jTRLjKPcoFz53gzRi33K9CH2nEczAGBsaqIARPlyz6BHnZsInpDFO9naFJJdiiIFbmaj9PhqLUHeLeXzQkH-ttvRAYDCe7UVD47P-tpwTQUfDrUZg4bWgjxBIAWsl~6kTrUG2FrTllgivqC6RYWICrDOMNop7cWZuMYWZ~Htt8GlJ2y-y~x~ytmYHBqtDX302VwVbKfK4VeHZuF1q1I6iO6MRH7HjCkxaGkTQ8PbKRviHW7MsxUQHhdWEv7IoxBHVWiFJUt02eRsRkbusilwwpxWzreBch0grWPmY1cwpHs8QytwzwvMLXWZEoD5z5DgANvwLQ-oCicS3fruC7g__')
        `,
        backgroundSize: "100% 40rem", // Full width, auto height
        backgroundPosition: "top center", // Keeps image aligned at the top
      }}
    >
      <div className="  px-4 py-24  ">
        <div className="space-y-16   text-center">
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
      </div>
    </main>
  );
}
