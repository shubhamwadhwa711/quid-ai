import React, { useRef } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { HelpCircle, Handshake, Share2, Lightbulb, ArrowRight } from "lucide-react";
const cardData = [
  {
    title: "Who Is Inside",
    description: "Discover exclusive profiles of top AI talents.",
    icon: "HelpCircle",
    gradientFrom: "from-purple-600",
    gradientTo: "to-purple-700",
    height: "h-44",
  },
  {
    title: "Be Part",
    description: "Join the largest global AI community.",
    icon: "Handshake",
    gradientFrom: "from-purple-600",
    gradientTo: "to-purple-700",
    height: "h-52",
  },
  {
    title: "Services",
    description: "Consulting, project support, training, & more.",
    icon: "Network",
    gradientFrom: "from-[#7C2BD3]",
    gradientTo: "to-[#075AA8]",
    height: "h-52",
  },
  {
    title: "AI Insights",
    description: "Knowledge, Interviews, Q&A, Videos.",
    icon: "Lightbulb",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-700",
    height: "h-44",
  },
];
const Hero = () => {
  const ref = useRef(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  return (
    <div ref={ref} className="flex flex-col w-full  items-center relative">
      <video
        className="absolute -translate-y-[20%] inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute -translate-y-[20%] inset-0 bg-gradient-to-t from-[rgba(13,18,46,0.8)] to-[rgba(13,18,46,0.6)] z-10"></div>
      <div className="relative mt-10 z-20 w-full flex flex-col items-center ">
        <div className="space-y-4 text-center mb-10">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.3 }}
            className="text-sm proxima-regular"
          >
            WORLD'S LARGEST AI THINK TANK
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-3xl"
          >
            <span className="proxima-bold"> AI Expertise</span>
            <span className=""> On </span>
            <span className="block -mt-4"> Demand </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <span className="block">
              From strategy to implementation, we provide
            </span>
            <span className="block mt-1">
              access to the brightest AI talents worldwide.
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-2 overflow-hidden">
          {/* First row */}
          <div className="grid grid-cols-1 gap-3 ">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: 1.2,
                ease: "easeOut",
              }}
            // style={{ opacity: opacity }}
            >
              <Card onClick={() => router.push("/search")} className="relative cursor-pointer  bg-gradient-to-br border-none from-[#7C2BD3]  to-[#075AA8] text-white h-[170px] w-[160px] overflow-hidden">
                <img
                  src="https://s3-alpha-sig.figma.com/img/554e/c14b/77d60e160046e44beff4d7387d8ad26d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QldYa7bBlo6Idjp0~5X7vLAYkXd-Lqc2cx38iBbPSR6eKsNlgUX5toO1vRCCiH9gjMtL0wzYCi4ClzSAM-~NO46VYLKe2kmEqCG9OB~BnoGUdSa2mXFy3LXifJ8FQdmVn2qYICmv-UpZy0VUU88Ee8XQ-j21uYK1dsqt9WH4QStkK8e3i70J6ed~lLQUrh4-xrmvYLyLRX3ySOaVGa6DCjG~a5Gfm4ROd1TLK-f72EBYSnJ4Tq25pjV2rdOqablHHwJinBs4n7rC7-KcAF9zmkMcAcyF13p0IdyQMh72RxNJ7AIWmxvf2AQKBjm5QHGpEZQ~1ceETuucTZgcKP-D4g__"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-10"
                />
                <CardHeader className="py-2 px-4 flex justify-between items-start h-full  relative z-10">
                  <HelpCircle className="w-6 h-6" />

                  <div className="flex flex-col text-start space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.5,
                        ease: "easeOut",
                      }}
                    >
                      <CardTitle className="proxima-large underline">
                        Explore AI Talent
                      </CardTitle>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.6,
                        ease: "easeOut",
                      }}
                    >
                      <CardDescription className="flex flex-col space-y-2 text-white/90 proxima-small text-sm ">
                        <span className="block">
                          Leads to AI Experts Directory
                        </span>

                        <ArrowRight className="w-5 h-5" />
                      </CardDescription>
                    </motion.div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Be Part - Bottom left card */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: 1.65,
                ease: "easeOut",
              }}
            // style={{ opacity: opacity }}
            >
              <Card onClick={() => router.push("/join-as-ai-expert")} className="relative cursor-pointer bg-gradient-to-tr border-none h-[200px] w-[160px] from-[#7C2BD3]  to-[#075AA8] text-white  overflow-hidden">
                <img
                  src="https://s3-alpha-sig.figma.com/img/8c77/bfd4/1fa2e49054a0cdc072595be2eba624b6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TENEczB~iihSWP020yEhIlqJ8hP4elnOsox~inlPJWC7SNANBJdu2SMtKrEXCa5lTNkyx~ItBfdOo3ggZn71bAIeiMwSECzMoMKa2WBD4mAONfT2SLdIeHDeJ~KeBykWFtvaBsrDxIqBMALPVgjc-IqGl-H8a2Z6jtTu5vGKRT49pkSPUxMdR4wpq6F8HWbQpcvjIXZ2QxBUIINzvudZFRrknsSjHg9eWFfl9cVlsHjTj~iF6ySjEJevudESem37B4n1zTke8oVJFL6ZaT~8TG-kN3jm1DzJkd8tiSFTN9JX0gu~PcgZWRMoxWv1QVLmne8Z9A8-5WePNmWa9hr-tg__"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-10"
                />
                <CardHeader className="p-4  flex justify-between items-start mb-2 h-full relative">
                  <Handshake className="w-8 h-8" />

                  <div className="flex flex-col text-start space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.7,
                        ease: "easeOut",
                      }}
                    >
                      <CardTitle className="proxima-large underline">
                        Join as an AI Expert
                      </CardTitle>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.7,
                        ease: "easeOut",
                      }}
                    >
                      <CardDescription className="flex flex-col space-y-2 text-white/90 proxima-small text-sm ">
                        <span className="block">
                          Leads to Sign-up Page
                        </span>

                        <ArrowRight className="w-5 h-5" />
                      </CardDescription>
                    </motion.div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          {/* Second column */}
          <div className="grid grid-cols-1 gap-2">
            {/* Services - Tall card on the right */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: 1.45,
                ease: "easeInOut",
              }}
            // style={{ opacity: opacity }}
            >
              <Card onClick={() => router.push("/services")} className="relative  cursor-pointer bg-gradient-to-bl border-none from-[#7C2BD3]  to-[#075AA8] text-white h-[200px] w-[160px] overflow-hidden">
                <img
                  src="https://s3-alpha-sig.figma.com/img/9a7f/fa42/3a369877c33cbbee232854f73042f342?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dCpTD~E1qQgicG521cGkdc8ihfWxyDH1~fYEMFQfBmJNt-brTJkLmNwZGVxOXaOFozVwR4Dww~3F8dEpJN8pVjOBRgK~AqRdR9pUAdkUKO8lrB1Y8NL4NgOCWfjkN5jc84C1a0zZbAToCn5RTDbDD-jBwJbHJ2IwLcJQ4OgRoSLBuREYtbu-rqbkQ0TGrE8EL6j459xNgxaqw9HyBoIwAYv~9qZCyUrNuYcca8wOo1HJLfcaMa8pKNovlRy9mPjwWFCklXa4VWZVgsS2ay02cJVsQQT5fdUcjgUgcINgMHusBpgaCY11rfjm4o~ke-pXZpi79i4a2-2tsuzYqb0cPQ__"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-10"
                />
                <CardHeader className="p-4 flex justify-between items-start h-full relative z-10">
                  <Share2 className="w-7 h-7" />
                  <div className="flex flex-col text-start space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.55,
                        ease: "easeOut",
                      }}
                    >
                      <CardTitle className="proxima-large underline">
                        Contact an AI Expert
                      </CardTitle>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: 1.55,
                        ease: "easeOut",
                      }}
                    >
                      <CardDescription className="flex flex-col space-y-2 text-white/90 proxima-small text-sm mt-2">
                        <span className="block">
                          Consulting, project, support, training & more
                        </span>

                        <ArrowRight className="w-5 h-5" />
                      </CardDescription>
                    </motion.div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* AI Insights - Bottom right card */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: 1.65,
                ease: "easeInOut",
              }}
            // style={{ opacity: opacity }}
            >
              <Card onClick={() => router.push("/insights")} className="relative cursor-pointer bg-gradient-to-tl border-none from-[#7C2BD3]  to-[#075AA8] text-white h-[170px] w-[160px] overflow-hidden">
                <img
                  src="https://s3-alpha-sig.figma.com/img/7605/8c37/a4eedc62e1a4f19e8ee83c0859d1faaf?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k16Upgn0sNwdZFFjtr6AQXn4Ow8J18APuvcbO-7Kn8TS7bFlnhk1O4PqQ0Yzb0lHvIDdQ-P7gEhTSoIiDoj14mAaEC~-HDtk3SQ3L273SymjVW7FSrWZHAajMiTv0n-He8zulMriVvHKig100zhUhFFirJtK5L5~rGGPQonjOTrjSPdosVFGLzu9tobJS2w-G~Azq4TI5h-KxnDf-F9I75P~bZtmmR-fBYGiSWZWTMx3uizwKfjoQyj3pL-AgfAzrHsuPBRNmiKiQhG-MUUE0B9uaAZDEnn-9chDMf5v9Y2W0bY0vedKHqYGZAxXBU3rbIU0bdMaKEJNh~f0Ot35aQ__"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-10"
                />
                <CardHeader className="py-2 px-3 flex justify-between items-start h-full relative z-10">
                  <Lightbulb className="w-7 h-7" />

                  <div className="flex flex-col text-start space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.3,
                        delay: 1.85,
                        ease: "easeOut",
                      }}
                    >
                      <CardTitle className="proxima-large underline">
                        AI Insights
                      </CardTitle>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.3,
                        delay: 1.85,
                        ease: "easeOut",
                      }}
                    >
                      <CardDescription className="flex flex-col space-y-2 text-white/90 proxima-small">
                        <span className="block">
                          Knowledge, Interviews, Q&A, Videos.
                        </span>

                        <ArrowRight className="w-5 h-5" />
                      </CardDescription>
                    </motion.div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
