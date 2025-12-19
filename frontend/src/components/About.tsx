import React, { useRef } from "react";
import { Check } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const about = [
    {
      id: 1,
      label: (
        <>
          Get matched with AI expert in
          <br />
          minutes.
        </>
      ),
    },
    {
      id: 2,
      label: (
        <>
          Dedicated 24/7 customer
          <br />
          service team for your queries.
        </>
      ),
    },
    {
      id: 3,
      label: (
        <>
          Enjoy a simple, easy-to-use
          <br />
          matching experience.
        </>
      ),
    },
    {
      id: 4,
      label: (
        <>
          Get quality work done quickly
          <br />
          and within budget.
        </>
      ),
    },
  ];

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center snap-center px-4 relative"
    >
      {/* Decorative background shape */}
      <div className="absolute top-10 right-0 w-32 h-32 bg-[#425BFF]/10 rounded-full blur-3xl"></div>

      <div className="text-white py-8 rounded-lg relative z-10">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-start"
          >
            <h1 className="text-3xl md:text-4xl proxima-bold mb-4">
              What & Why <span className="text-[#425BFF]">Quid AI</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-white/80">
              We offer a platform with top AI Experts.
              <br className="hidden md:block" />
              Work with the best talent worldwide on our
              <br className="hidden md:block" />
              secure, flexible, and seamless platform.
            </p>
          </motion.div>

          <div className="space-y-5 md:text-base lg:text-lg overflow-hidden">
            {about.map((item, index) => {
              const xOffset = useTransform(
                scrollYProgress,
                [0, 0.5],
                [index % 2 === 0 ? -100 : 100, 0]
              );
              return (
                <motion.div
                  style={{ x: xOffset }}
                  key={item.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start text-start gap-4 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[#425BFF]/30 transition-all"
                >
                  <div className="bg-[#425BFF]/20 p-2 rounded-full">
                    <Check
                      size={20}
                      strokeWidth={3}
                      className="text-[#425BFF] flex-shrink-0"
                    />
                  </div>
                  <span className="text-white/90">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
