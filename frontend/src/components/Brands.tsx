import { useState } from "react";
import { Button } from "./ui/button";
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
const categories = Object.keys(brandData);
const Brands = () => {
  const [selectedCategory, setSelectedCategory] = useState("Telco");

  return (
    <div className="relative border h-[400px] rounded-xl p-4">
      {/* Title */}
      <div className="absolute text-2xl -top-5 left-1/2 -translate-x-1/2 text-nowrap px-4 py-1 bg-white/1 backdrop-blur-md text-white z-10 rounded-md">
        WORKED WITH TOP BRANDS
      </div>

      {/* Categories */}
      <div className="m-4 pb-2 flex gap-4 overflow-x-auto ">
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
          <div key={index} className="flex items-center justify-center p-2">
            <img
              src={brand.url}
              alt={`${brand.name} logo`}
              className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
