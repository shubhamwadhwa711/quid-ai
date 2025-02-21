import React, { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ChevronRight, Divide, Check, MoveRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
const FAQ = [
  {
    id: 1,
    question: "What is the process tp hire an AI expert",
    answer:
      "Discover realiable professionals by exploring their portfolios and immersing yourself in the feedback shared on their profiles",
  },
  {
    id: 2,
    question: "How can I pay to the AI Experts?",
    answer: "",
  },
  {
    id: 3,
    question: "What is the process to hire an expert?",
    answer: "",
  },
];

const brandData = {
  Telco: [
    {
      name: "Microsoft",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/i8prphmo6qg6rnliopeh.png",
    },
    {
      name: "Samsung",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/y4r3yorp7jdcrvg3vrxy.png",
    },
    {
      name: "Google",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/fktdz4tzrgz3ontonz69.png",
    },
    {
      name: "Discord",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/r3lkfnldpgbpmzxfx8fy.png",
    },
    {
      name: "Intel",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/pfan7ykyt117mulrg3iq.png",
    },
    {
      name: "Meta",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948328/quidAi/lm7tk69xjecwryeozuum.png",
    },
    {
      name: "Netflix",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/ol7ht5zbzvwfmxttw7yy.png",
    },
    {
      name: "Amazon",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/ngzmyrjzatvjwsvn0wdb.png",
    },
    {
      name: "Lakme",
      url: "https://res.cloudinary.com/dgz1duuwu/image/upload/v1739948327/quidAi/beujzp1m5a11fblem753.png",
    },
  ],
  Government: [
    { name: "Govt1", url: "/api/placeholder/120/60" },
    { name: "Govt2", url: "/api/placeholder/120/60" },
    { name: "Govt3", url: "/api/placeholder/120/60" },
  ],
  Startups: [
    { name: "Startup1", url: "/api/placeholder/120/60" },
    { name: "Startup2", url: "/api/placeholder/120/60" },
    { name: "Startup3", url: "/api/placeholder/120/60" },
  ],
  "Banks/Fintech": [
    { name: "Bank1", url: "/api/placeholder/120/60" },
    { name: "Bank2", url: "/api/placeholder/120/60" },
    { name: "Bank3", url: "/api/placeholder/120/60" },
  ],
  Corporate: [
    { name: "Corp1", url: "/api/placeholder/120/60" },
    { name: "Corp2", url: "/api/placeholder/120/60" },
    { name: "Corp3", url: "/api/placeholder/120/60" },
  ],
};
const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "interview":
      return "#075AA8";
    case "case study":
      return "#899DA8";
    default:
      return "#000000"; // Default color if needed
  }
};
const insightsCategories = ["All", "Insights", "Interviews", "Videos", "Q&A"];
const insightsData = {
  All: [
    {
      id: 1,
      title: "What Does a Customer Support Agent Do",
      type: "INTERVIEW",
      image:
        "https://s3-alpha-sig.figma.com/img/c169/7acc/96c3d4829363b34e57c09e49ebee16b1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RYmXSmMgokBJOtZesudU-rjPMV-13tJ51DRu6QHX-llH~me-yWyLf7CbVm0CzXqTsIXT4vtsQDEmQFl1xN~rrL43hf3nzHfaUgW-BwDsKAiWyJWhdXOAR3Fc2czLAdQMfWNjrvnF7DP2znq-gJZ0gSS-mty8e4k1WRMokq18bmixgknq6-frLk-0mBK0WxEhi6fFHCPXnTmKZhoqmtuRBizdhCWK8BMIIwD-ZT7oZ74PbOo3uo00Ownqit3gk1BqQLFLOD~lwjsTtspt14P4qIOicauBkfq8Fx5cw5y~TGFyaRHweUPJTVha6Sj1kEGyaHX~9g5rasbKpQ2bCTjXJA__",
    },
    {
      id: 2,
      title: "Getting work done has never been easier",
      type: "CASE STUDY",
      image:
        "https://s3-alpha-sig.figma.com/img/eeab/5fbd/9abbccd9c8c0247a3eaca614d16f590b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GxJLmPlRyHsKZUZm6LhnuMTTYP7opTogesYOvLhv7JJLM6iwPH-MVthhAUjhtD4yh0Mq-lKzQk38t3cL8WxON~FAJBIdKsk8aCvETo9QFe-8StZr5TL44cB3gxM3ae07XogupliwC9D4E51zMcMv~rK3NpDqmfpy38cOD6iWiirHFpg2vr2oq2d9SRynh8zUPvg7vt~G7S70aigZwYCjjrhzD~UYs130mlaU0~kt4MapmSFLPIjdAGVIzdbsa8yKKbtt3xPlprpoTTswTkdI6y2I5rLnJV1YWtK8A24BN6v9H7mdNCsULbFYc4M3mA~eoqvOr2-g-EOwrZrNNZbhjw__",
    },
    {
      id: 2,
      title: "Getting work done has never been easier",
      type: "CASE STUDY",
      image:
        "https://s3-alpha-sig.figma.com/img/eeab/5fbd/9abbccd9c8c0247a3eaca614d16f590b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GxJLmPlRyHsKZUZm6LhnuMTTYP7opTogesYOvLhv7JJLM6iwPH-MVthhAUjhtD4yh0Mq-lKzQk38t3cL8WxON~FAJBIdKsk8aCvETo9QFe-8StZr5TL44cB3gxM3ae07XogupliwC9D4E51zMcMv~rK3NpDqmfpy38cOD6iWiirHFpg2vr2oq2d9SRynh8zUPvg7vt~G7S70aigZwYCjjrhzD~UYs130mlaU0~kt4MapmSFLPIjdAGVIzdbsa8yKKbtt3xPlprpoTTswTkdI6y2I5rLnJV1YWtK8A24BN6v9H7mdNCsULbFYc4M3mA~eoqvOr2-g-EOwrZrNNZbhjw__",
    },
    // { id: 3, title: "Tech Innovations", type: "Videos" },
    // { id: 4, title: "Startup Q&A", type: "Q&A" },
  ],
  Insights: [{ id: 1, title: "Market Trends 2024", type: "Insights" }],
  Interviews: [{ id: 2, title: "Exclusive CEO Interview", type: "Interviews" }],
  Videos: [{ id: 3, title: "Tech Innovations", type: "Videos" }],
  "Q&A": [{ id: 4, title: "Startup Q&A", type: "Q&A" }],
};
const categories = Object.keys(brandData);
const Solutions = [
  {
    label: "Healthcare & Pharma",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/xbnlyaxtqa1lqdlsag3u.png",
  },
  {
    label: "Hospitality Management",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/zfa2mfxyhuqmd4tfrno8.png",
  },
  {
    label: "Banks & Fintech",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/ebvdoqqr1boilamfsqwn.png",
  },
  {
    label: "Marketing Experts",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/qmkwqvruzkvpgsz9pbnz.png",
  },
  {
    label: "Corporate World",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/oachy0hnhep4hly7kyfe.png",
  },
  {
    label: "Events & Training",
    image:
      "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/rx5tv3bg7ow1jwyhdp1v.png",
  },
];
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Telco");
  const [selectedInsights, setSelectedInsights] = useState("All");
  return (
    <main
      className={`min-h-screen text-white bg-gradient-to-tr from-black via-blue-950 to-black  ${geistSans.variable} font-sans`}
    >
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="space-y-16 text-center">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-4xl  tracking-tight font-bold leading-10">
              WORLD'S LARGEST AI THINK TANK
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium ">
              <span className="font-bold">AI Expertise</span> On Demand
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              From strategy to implementation, we provide access to the
              brightest AI talents worldwide.
            </p>
          </div>

          <div className="w-full  max-w-3xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {Hero.map((hero, index) => (
                <Card className="bg-gradient-to-r text-white from-[#7C2BD3] to-[#075AA8]">
                  <CardHeader>
                    <CardTitle className="underline">{hero.name}</CardTitle>
                    <CardDescription className="text-white font-thin">
                      {hero.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          {/* Brands */}
          <div className="relative border h-[400px] rounded-xl p-4">
            {/* Title */}
            <div className="absolute text-2xl -top-5 left-1/2 -translate-x-1/2 text-nowrap px-4 py-1 bg-white/1 backdrop-blur-md text-white z-10 rounded-md">
              WORKED WITH TOP BRANDS
            </div>

            {/* Categories */}
            <div className="flex gap-4 justify-center mt-4 mb-8 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="none"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md ${
                    selectedCategory === category
                      ? "bg-[#425BFF] text-white"
                      : "bg-gradient-to-tr bg-white/30"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Logos Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-8 mt-8 p-4">
              {brandData[selectedCategory].map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-2"
                >
                  <img
                    src={brand.url}
                    alt={`${brand.name} logo`}
                    className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* What & Why QuidAI */}
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">
              What & Why <span className="text-[#425BFF]">Quid AI</span>
            </h1>
            <p>
              We offer a platform with top AI Experts. Work with the best talent
              worldwide on our secure. flexible,and seamless platform
            </p>
            <div>
              {About.map((about) => (
                <div className="flex items-center space-x-10">
                  <Check className="h-8 w-8  text-[#F8984C]" />
                  <div key={about.id} className="text-lg">
                    {about.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*  The Ultimate AI solutions for your bussinesses*/}
          <div className="relative w-full ">
            {/* Background Image Container */}
            <div className="absolute -top-40 left-0 w-full h-[50vh] flex justify-center">
              <img
                src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
                alt="Spiral Background"
                className="w-full h-full object-fill"
              />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4">
              {/* Hero Text Section */}
              <div className="pt-20 md:pt-32 pb-16 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white max-w-3xl mx-auto leading-tight relative">
                  The <span className="text-[#425BFF]">Ultimate AI</span>{" "}
                  Solutions For Your Business
                </h1>
                <p className="text-white mt-4 text-lg md:text-xl">
                  We've expert in these multiple domains
                </p>
              </div>

              {/* Solutions Grid */}
              <div className="w-full overflow-x-auto pb-8">
                <div className="grid grid-cols-3 gap-4 min-w-[320px] max-w-5xl mx-auto">
                  {Solutions.map((solution, index) => (
                    <Card
                      key={index}
                      className="bg-white/10 flex flex-col items-center justify-center p-4 md:p-6 h-32 md:h-40"
                    >
                      <img
                        src={solution.image}
                        alt={solution.label}
                        className="w-8 h-8 md:w-10 md:h-10 object-cover"
                      />
                      <CardHeader className="p-2 md:p-4">
                        <CardTitle className="text-white font-thin text-sm md:text-base">
                          {solution.label}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
              <Button className="px-10 py-6 rounded-3xl bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8]">
                Get Connected For Free <MoveRight />
              </Button>
            </div>
          </div>

          {/* How it works */}
          <div className="space-y-6 flex flex-col justify-center items-center">
            <div>
              <h1 className="text-4xl font-semibold">
                How It <span className="text-[#425BFF]">Works</span>
              </h1>
            </div>
            <div>
              <p>
                Get matched with AI experts in minutes & complete your tasks.
              </p>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1739950985/quidAi/egj6nyjzj0x8hmhk8kr9.png"
                alt=""
              />
            </div>
            <div>
              <Button className="px-10 py-6 rounded-3xl bg-gradient-to-r text-white from-[#7C2BD3] to-[#075AA8]">
                Search Now <MoveRight />
              </Button>
            </div>
          </div>
          {/* Quid AI Insights */}
          <div>
            <div>
              <h1 className="text-4xl font-semibold">
                Quid AI <span className="text-[#425BFF] ">Insights</span>
              </h1>
            </div>

            <div className="p-4 space-y-8">
              {/* Categories Section */}
              <div className="mb-4 pb-2 flex gap-4 overflow-x-auto scrollbar-none sm:grid sm:grid-cols-3">
                {insightsCategories.map((insights) => (
                  <button
                    key={insights}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md flex-shrink-0 ${
                      selectedInsights === insights
                        ? "bg-[#425BFF] text-white"
                        : "bg-white/30"
                    }`}
                    onClick={() => setSelectedInsights(insights)}
                  >
                    {insights}
                  </button>
                ))}
              </div>

              {/* Cards Section */}
              <div className="w-full">
                <div className="relative">
                  <div className="flex overflow-x-auto scrollbar-none">
                    <div className="flex gap-4 min-w-max px-1 pb-4">
                      {insightsData[selectedInsights].map((insight) => (
                        <Card
                          key={insight.id}
                          className="hover:shadow-md bg-gray-800 transition flex-shrink-0 w-60 h-56"
                        >
                          <div className="relative h-3/5">
                            <img
                              src={insight.image}
                              alt={insight.title}
                              className="w-full h-full object-fill rounded-t-lg"
                            />
                            <div
                              className="absolute top-2 left-2 text-white text-sm px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: getTypeColor(insight.type),
                              }}
                            >
                              {insight.type}
                            </div>
                          </div>

                          <div className="h-2/5 flex flex-col justify-between p-4">
                            <CardDescription className="text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <div className="bg-[#425BFF] h-2 w-2 rounded-full"></div>
                                <div className="text-slate-400">
                                  14 Feb 2025
                                </div>
                              </div>
                            </CardDescription>
                            <CardTitle className="text-lg text-white font-semibold truncate">
                              {insight.title}
                            </CardTitle>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* FAQ */}
          <div className="w-full  mx-auto py-8 px-4">
            <div className="mb-8 space-y-6">
              <h1 className="text-4xl font-semibold mb-2">
                Have any <span className="text-[#425BFF]">Questions</span>
              </h1>
              <p className="text-gray-300 text-lg mb-4">
                Read our FAQs if you have queries
              </p>
              <Separator orientation="horizontal" className="mb-6" />
            </div>

            <Accordion type="single" collapsible className=" w-full">
              {FAQ.map((item) => (
                <AccordionItem key={item.id} value={`item-${item.id}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg flex items-center justify-between w-full">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-lg">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* Signup section */}
          <div>
            <Card className="bg-white/10">
              <img
                src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740048424/quidAi/rjrwhzfaf1kclwfppmbw.png"
                alt=""
              />
              <CardHeader>
                <CardTitle className="btextg-[#425BFF]">
                  <h1 className="text-white text-4xl">
                    <span className="text-[#425BFF]">Get Connected</span> With
                    Top AI Experts for Free
                  </h1>
                </CardTitle>
              </CardHeader>
              <Button className="px-10 py-6 rounded-3xl  bg-gradient-to-tr mb-8 from-[#7C2BD3] to-[#075AA8]">
                Sign Up Now <MoveRight />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
