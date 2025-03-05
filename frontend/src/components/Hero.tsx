import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const heros = [
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
const Hero = () => {
  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-4xl  tracking-tight font-bold leading-10">
          WORLD'S LARGEST AI THINK TANK
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium ">
          <span className="font-bold">AI Expertise</span> On Demand
        </h2>
        <p className="text-lg max-w-2xl  mx-auto">
          From strategy to implementation, we provide access to the brightest AI
          talents worldwide.
        </p>
      </div>

      <div className="w-full mt-10 max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {heros.map((hero, index) => (
            <Card
              key={index}
              className="bg-gradient-to-r text-white from-[#7C2BD3] to-[#075AA8]"
            >
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
    </div>
  );
};

export default Hero;
