import Link from "next/link";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

import { motion } from "framer-motion";

export default function JoinExpertCTA() {
    return (
        <div className="flex flex-col justify-center items-center px-4 relative">
            {/* Decorative shapes */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#7C2BD3]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#425BFF]/10 rounded-full blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-4 relative z-10"
            >
                <h1 className="text-3xl md:text-4xl proxima-bold">
                    Join as an <span className="text-[#425BFF]">AI Expert</span>
                </h1>
                <p className="text-sm md:text-base text-white/70 mt-2 px-4">
                    Share your expertise and connect with top companies
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="bg-white/10 border-[#545C6C] hover:border-[#425BFF]/50 transition-all mx-4">
                    <CardHeader className="p-0">
                        <img
                            src="/ai-expert.jpg"
                            alt="AI Expert"
                            className="h-56 w-full object-cover p-8"
                        />
                        <CardTitle>
                            <div className="flex flex-col proxima-bold text-xl justify-center items-center text-center px-4">
                                <span className="text-white">Ready to showcase</span>
                                <span className="text-[#425BFF] -mt-2">your AI skills?</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <div className="mt-4 flex flex-col justify-center items-center px-4 pb-8">
                        <p className="text-sm text-center mb-4 text-white/70">
                            Join our community of elite AI professionals
                        </p>
                        <Link
                            href="/join-as-ai-expert"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <Button className="w-full px-10 py-6 rounded-3xl proxima-large bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] flex justify-center items-center gap-2">
                                <span className="proxima-bold text-white text-xl">
                                    Join as Expert
                                </span>
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
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
