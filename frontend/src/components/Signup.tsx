import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Signup = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center pb-20 px-4 relative">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-4 w-32 h-32 bg-[#425BFF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-4 w-40 h-40 bg-[#7C2BD3]/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-white/10 mb-16 border-[#545C6C] hover:border-[#425BFF]/50 transition-all">
          <CardHeader className="p-0">
            <img
              src="/signup.png"
              alt=""
              className="h-96 w-96 -mt-6  object-cover"
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
              className="px-10 py-6 rounded-3xl proxima-large bg-gradient-to-r mb-8 from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] flex justify-center items-center gap-2"
            >
              <span className="proxima-bold text-white text-xl">Search AI Experts</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
