import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchSolutions } from "@/reducers/solutions/solutionSlice";
import { useEffect } from "react";
const Solutions = () => {
  const dispatch = useAppDispatch();
  const { Solutions, loading, error } = useAppSelector(
    (state) => state.Solutions
  );
  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);
  console.log("Solutions", Solutions);
  return (
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
      <div className="relative z-10 container">
        {/* Hero Text Section */}
        <div className="space-y-6 py-6">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl proxima-ultimate">
              The <span className="text-[#425BFF]">Ultimate AI </span>
              Solutions for Your Business
            </h1>
            <p className="mt-4 text-lg proxima-small">
              We've expert in these multiple domains
            </p>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="w-full overflow-x-auto hide-scrollbar pb-8">
          <div className="grid grid-cols-3  gap-x-1 gap-y-3 min-w-[320px] max-w-5xl">
            {Solutions.map((solution) => (
              <Card
                key={solution.id}
                className="bg-white/10 border-[#545C6C] flex flex-col items-center justify-center p-4 md:p-6 h-28 w-28"
              >
                <img
                  src={solution.logo}
                  alt={solution.name}
                  className="w-8 h-8 md:w-10 md:h-10 object-cover"
                />
                <CardHeader className="p-2">
                  <CardTitle className="text-white proxima-solutions">
                    {solution.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <Button className="px-8 py-6 proxima-large rounded-full bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] text-white">
          Get Connected For Free
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H17M17 7L11 1M17 7L11 13"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Solutions;
