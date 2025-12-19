import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchSolutions } from "@/reducers/solutions/solutionSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const Solutions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { Solutions, loading, error } = useAppSelector(
    (state) => state.Solutions
  );
  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);
  // console.log("Solutions", Solutions);
  return (
    <div className="relative w-full flex items-center justify-center px-4">
      {/* Background Image Container */}
      <div className="absolute -top-52 mx-auto right-0 opacity-30">
        <img
          src="/Icons/Spiral.png"
          alt="Spiral decoration"
          className=""
        />
      </div>
      {/* Decorative shapes */}
      <div className="absolute top-20 left-4 w-24 h-24 bg-[#425BFF]/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-4 w-32 h-32 bg-[#7C2BD3]/10 rounded-full blur-2xl"></div>

      {/* Content Container */}
      <div className="relative container flex flex-col items-center justify-center gap-6">
        {/* Hero Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl proxima-bold leading-tight">
            The <span className="text-[#425BFF]">Ultimate AI</span>
            <span className="block mt-1">Solutions for Your Business</span>
          </h1>
          <p className="mt-3 text-white/70">We've experts in these multiple domains</p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="w-full flex justify-center overflow-x-auto hide-scrollbar pb-8">
          <div className="grid grid-cols-3 gap-x-2 gap-y-3">
            {Solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="bg-white/10 border-[#545C6C] hover:border-[#425BFF]/50 flex flex-col items-center justify-center p-4 md:p-6 h-28 w-28 transition-all hover:scale-105 cursor-pointer"
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
              </motion.div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => router.push("/search")}
          className="px-6 py-6 proxima-bold text-xl rounded-full bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] text-white"
        >
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
