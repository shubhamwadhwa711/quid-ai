import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "./ui/button";

const Working = () => {
  return (
    <div className="space-y-6 flex flex-col justify-center items-center">
      <div className="-mt-96">
        <h1 className="text-3xl proxima-bold ">
          How It <span className="text-[#425BFF]">Works</span>
        </h1>
        <span className="text-sm proxima-small">
          Get matched with AI experts in minutes &
        </span>
        <span className="text-sm block mt-1">complete your tasks.</span>
      </div>
      <div>
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1739950985/quidAi/egj6nyjzj0x8hmhk8kr9.png"
          alt=""
          className="mt-4"
        />
      </div>
      <div>
        <Button className="px-8 py-6 proxima-bold text-xl rounded-3xl bg-gradient-to-r text-white from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8]">
          <div className="flex justify-center items-center gap-2">
            Search AI Experts
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
    </div>
  );
};

export default Working;
