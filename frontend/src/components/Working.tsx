import { useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Stepper, Step, StepProps } from "./ui/stepper";
import { motion, useScroll } from "framer-motion";
const Working = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const router = useRouter();
  const steps = useMemo<StepProps[]>(
    () => [
      {
        title: "Search AI Experts",
        description:
          "Find experts in teach, adivse, consult, speak, interview.",
        icon: <img src={"/Icons/search-ai-experts.svg"} />,
        isActive: true,
        orientation: "left",
      },
      {
        title: "Send Message",
        description: "Connect & send message to the suitable talent.",
        icon: <img src={"/Icons/send-message.svg"} />,
        isActive: true,
        orientation: "right",
      },
      {
        title: "Connect them",
        description:
          "Engage an expert to advise, teach, or speak for your company.",
        icon: <img src={"/Icons/connect-them.svg"} />,
        isActive: true,
        orientation: "left",
      },
    ],
    []
  );
  return (
    <div
      id="works"
      ref={ref}
      className="space-y-8 flex flex-col justify-center items-center px-4 relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#7C2BD3]/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <h1 className="text-3xl md:text-4xl proxima-bold text-center">
          How It <span className="text-[#425BFF]">Works</span>
        </h1>
        <p className="text-sm md:text-base text-white/70 mt-2">
          Get matched with AI experts in minutes & complete your tasks.
        </p>
      </motion.div>
      <div className="">
        <Stepper current={-1}>
          {steps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
              orientation={step.orientation}
            />
          ))}
        </Stepper>
      </div>
      <div>
        <Button
          onClick={() => router.push("/search")}
          className="px-8 py-6 proxima-bold text-xl rounded-3xl bg-gradient-to-r text-white from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8]"
        >
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Working;
