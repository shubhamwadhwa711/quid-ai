import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ChevronRight, Divide, Check, MoveRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const Hero = [
  {
    name: "Who Is Inside",
    description: "Explore profiles of top AI talents",
    icon: "👥",
  },
  {
    name: "Our Expertise",
    description: "Discover our AI capabilities",
    icon: "🧠",
  },
  {
    name: "Case Studies",
    description: "See our impact in action",
    icon: "📊",
  },
  {
    name: "AI Insights",
    description: "Knowledge, Interviews, Q&A, Videos",
    icon: "📊",
  },
];
const About = [
  {
    id: 1,
    label: "Get matched with AI expert in minutes",
  },
  {
    id: 2,
    label: "Dedicated 24/7 customer service team for your queries",
  },
  {
    id: 3,
    label: "Enjoy a simple, easy-to-use matching experience",
  },
  {
    id: 4,
    label: "Get quality work done quickly and within budget",
  },
];
export default function Home() {
  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-gray-50 to-white ${geistSans.variable} font-sans`}
    >
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="space-y-16 text-center">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              WORLD'S LARGEST AI THINK TANK
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
              <span className="font-bold">AI Expertise</span> On Demand
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From strategy to implementation, we provide access to the
              brightest AI talents worldwide.
            </p>
          </div>

          <div className="w-full max-w-3xl mx-auto">
            <div className="grid gap-4">
              {Hero.map((hero, index) => (
                <Button
                  key={hero.name}
                  variant="ghost"
                  className="w-full p-4 h-auto group hover:bg-gray-100/80 transition-all"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-6">
                      {/* <span className="text-2xl">{hero.icon}</span> */}
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-lg">{hero.name}</span>
                        <Separator
                          orientation="vertical"
                          className="h-6 rounded-lg w-1"
                        />
                        <span className="text-gray-500">
                          {hero.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          {/* Brands */}
          <div></div>
          {/* What & Why QuidAI */}
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">
              What & Why <span className="text-orange-500">Quid AI</span>
            </h1>
            <p>
              We offer a platform with top AI Experts. Work with the best talent
              worldwide on our secure. flexible,and seamless platform
            </p>
            <div>
              {About.map((about) => (
                <div className="flex items-center space-x-10">
                  <Check className="h-10 w-10" />
                  <div key={about.id}>{about.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/*  */}
          {/* How it works */}
          <div className="space-y-6 flex flex-col justify-center items-center">
            <div>
              <h1 className="text-4xl font-semibold">
                How It <span className="text-orange-500">Works</span>
              </h1>
            </div>
            <div>
              <p>
                Get matched with AI experts in minutes & complete your tasks.
              </p>
            </div>
            <div>
              <Button className="px-10 py-6 rounded-3xl">
                Search Now <MoveRight />
              </Button>
            </div>
          </div>
          {/* Quid AI Insights */}
          <div></div>
        </div>
      </div>
    </main>
  );
}
