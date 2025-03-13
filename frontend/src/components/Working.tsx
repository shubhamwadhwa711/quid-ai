import { ArrowRight, MoveRight } from "lucide-react";
import { Button } from "./ui/button";

const Working = () => {
  return (
    <div className="space-y-6 flex flex-col justify-center items-center">
      <div>
        <h1 className="text-4xl proxima-medium">
          How It <span className="text-[#425BFF]">Works</span>
        </h1>
      </div>
      <div>
        <p className="text-lg proxima-small">
          Get matched with AI experts in minutes &
          <br />
          <br />
          complete your tasks.
          <br />
        </p>
      </div>
      <div>
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1739950985/quidAi/egj6nyjzj0x8hmhk8kr9.png"
          alt=""
          className="mt-4"
        />
      </div>
      <div>
        <Button className="px-10 py-6 proxima-large rounded-3xl bg-gradient-to-r text-white from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8]">
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
