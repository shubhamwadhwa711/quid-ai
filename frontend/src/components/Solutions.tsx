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
    <div className="relative w-full min-h-screen flex items-center justify-center">
      {/* Background Image Container */}
      <div className="absolute -top-60 left-0 w-full h-[50vh] flex justify-center">
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
          alt="Spiral Background"
          className="w-full h-full object-fill"
        />
      </div>

      {/* Content Container */}
      <div className="relative -mt-96 z-10 container flex flex-col items-center justify-center gap-6">
        {/* Hero Text Section */}
        <div className="text-center">
          <h1 className="text-3xl proxima-bold leading-tight">
            The <span className="text-[#425BFF]">Ultimate AI </span>
            <span className="block -mt-6">Solutions for Your</span>
            <span className="block -mt-6">Business</span>
          </h1>
          <p className="mt-1">We've expert in these multiple domains</p>
        </div>

        {/* Solutions Grid */}
        <div className="w-full flex justify-center overflow-x-auto hide-scrollbar pb-8">
          <div className="grid grid-cols-3 gap-x-2 gap-y-3">
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
                  <CardTitle className="text-white text-xs font-semibold">
                    {solution.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Button className="px-6 py-6 proxima-bold text-xl rounded-full bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] text-white">
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Solutions;
