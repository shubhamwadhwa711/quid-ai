import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

const Signup = () => {
  return (
    <div className=" ">
      <Card className=" bg-white/10 flex flex-col justify-center items-center">
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740048424/quidAi/rjrwhzfaf1kclwfppmbw.png"
          alt=""
          className="h-1/2"
        />
        <CardHeader>
          <CardTitle className="text-[#425BFF]">
            <h1 className="text-white text-4xl">
              <span className="text-[#425BFF]">Get Connected</span> With Top AI
              Experts for Free
            </h1>
          </CardTitle>
        </CardHeader>
        <Button className="px-10 py-6 rounded-3xl  bg-gradient-to-tr mb-8 from-[#7C2BD3] to-[#075AA8]">
          Sign Up Now <MoveRight />
        </Button>
      </Card>
    </div>
  );
};

export default Signup;
