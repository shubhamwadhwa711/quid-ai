import { Check } from "lucide-react";
const about = [
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
const About = () => {
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-semibold">
        What & Why <span className="text-[#425BFF]">Quid AI</span>
      </h1>
      <p>
        We offer a platform with top AI Experts. Work with the best talent
        worldwide on our secure. flexible,and seamless platform
      </p>
      <div>
        {about.map((about) => (
          <div className="flex items-center space-x-10">
            <Check className="h-8 w-8  text-[#F8984C]" />
            <div key={about.id} className="text-lg">
              {about.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
