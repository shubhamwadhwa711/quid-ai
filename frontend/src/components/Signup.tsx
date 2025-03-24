import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
const Signup = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col  justify-center items-center">
      <Card className="bg-white/10 mb-16 border-[#545C6C] mx-4">
        <CardHeader className="p-0">
          <img
            src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740048424/quidAi/rjrwhzfaf1kclwfppmbw.png"
            alt=""
            className="h-[338.87px] w-[358.91px] -mt-6  object-cover" // Optional: object-cover to fit better
          />
          <CardTitle className="">
            <div className="flex flex-col proxima-bold text-2xl justify-center items-center text-center">
              <span className="text-[#425BFF] -mt-3">Get Connected</span>
              <span className="text-white -mt-3">With Top AI Experts</span>
              <span className="text-white -mt-3">for Free!</span>
            </div>
          </CardTitle>
        </CardHeader>
        <div className="mt-4 flex flex-col justify-center items-center">
          <Button
            onClick={() => router.push("/search")}
            className="px-10 py-6 rounded-3xl proxima-large bg-gradient-to-r mb-8 from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8]"
          >
            <div className="flex justify-center items-center gap-2">
              <span className="proxima-bold text-xl">Search AI Experts</span>
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
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
