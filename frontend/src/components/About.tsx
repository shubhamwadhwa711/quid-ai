import { Check } from "lucide-react";
const about = [
  {
    id: 1,
    label: "Get matched with AI expert in minutes.",
  },
  {
    id: 2,
    label: "Dedicated 24/7 customer service team for your queries.",
  },
  {
    id: 3,
    label: "Enjoy a simple, easy-to-use matching experience.",
  },
  {
    id: 4,
    label: "Get quality work done quickly and within budget.",
  },
];
const About = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-6 p-6">
        <div className="flex flex-col justify-center items-center text-start">
          <h1 className="text-3xl font-medium">
            What & Why <span className="text-[#425BFF]">Quid AI</span>
          </h1>
          <p className="mt-4 text-lg">
            We offer a platform with top AI
            <br />
            Experts. Work with the best talent
            <br />
            worldwide on our secure, flexible,
            <br />
            and seamless platform.
          </p>
        </div>
      </div>

      <div className="space-y-3 ">
        {about.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            {/* Fixed width icon box to align all text starts */}
            <div className="w-6 flex ml-2 justify-center">
              <Check
                size={48}
                strokeWidth={4}
                className="text-[#F8984C]  w-5 h-5"
              />
            </div>
            {/* Text takes remaining width, aligned properly */}
            <p className="text-xs sm:text-sm md:text-lg proxima-small line-clamp-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
