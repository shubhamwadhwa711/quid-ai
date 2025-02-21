import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";

const Working = () => {
  return (
    <div className="space-y-6 flex flex-col justify-center items-center">
      <div>
        <h1 className="text-4xl font-semibold">
          How It <span className="text-[#425BFF]">Works</span>
        </h1>
      </div>
      <div>
        <p>Get matched with AI experts in minutes & complete your tasks.</p>
      </div>
      <div>
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1739950985/quidAi/egj6nyjzj0x8hmhk8kr9.png"
          alt=""
        />
      </div>
      <div>
        <Button className="px-10 py-6 rounded-3xl bg-gradient-to-r text-white from-[#7C2BD3] to-[#075AA8]">
          Search Now <MoveRight />
        </Button>
      </div>
    </div>
  );
};

export default Working;
