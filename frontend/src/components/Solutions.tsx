import { MoveRight } from "lucide-react";
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
      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Text Section */}
        <div className="pt-20 md:pt-32 pb-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white max-w-3xl mx-auto leading-tight relative">
            The <span className="text-[#425BFF]">Ultimate AI</span> Solutions
            For Your Business
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl">
            We've expert in these multiple domains
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="w-full overflow-x-auto pb-8">
          <div className="grid grid-cols-3 gap-4 min-w-[320px] max-w-5xl mx-auto">
            {Solutions.map((solution) => (
              <Card
                key={solution.id}
                className="bg-white/10 flex flex-col items-center justify-center p-4 md:p-6 h-32 md:h-40"
              >
                <img
                  src={solution.logo}
                  alt={solution.name}
                  className="w-8 h-8 md:w-10 md:h-10 object-cover"
                />
                <CardHeader className="p-2 md:p-4">
                  <CardTitle className="text-white font-thin text-sm md:text-base">
                    {solution.name}
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
  );
};

export default Solutions;
