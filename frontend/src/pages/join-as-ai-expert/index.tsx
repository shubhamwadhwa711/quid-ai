import React from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Users, Award, Target, LogIn, Edit, Rocket } from "lucide-react";

const JoinAsAIExpert = () => {
    const router = useRouter();

    const benefits = [
        {
            icon: Target,
            title: "Access Top Projects",
            description: "Work on cutting-edge AI initiatives and challenging problems.",
        },
        {
            icon: Users,
            title: "Network with Leading Clients",
            description: "Connect directly with industry leaders and top organizations.",
        },
        {
            icon: Award,
            title: "Showcase Expertise",
            description: "Highlight your skills and achievements to a global audience.",
        },
    ];

    const handleLinkedInSignUp = () => {
        signIn("linkedin", { callbackUrl: "/profile" });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#1a1a3e] to-[#0a0e27]">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pt-20 pb-16 px-4"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold proxima-bold text-white mb-6">
                        Join as an AI Expert
                    </h1>
                    <p className="text-xl text-white/80 proxima-large mb-8">
                        Be part of the world's leading AI talent community and unlock exclusive
                        opportunities designed for professionals like you.
                    </p>

                    {/* LinkedIn Sign Up Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-12"
                    >
                        <Button
                            onClick={handleLinkedInSignUp}
                            className="bg-gradient-to-r from-[#425BFF] to-[#0066ff] hover:from-[#3a4fd1] hover:to-[#0052cc] text-white px-8 py-6 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                            </svg>
                            Sign Up with LinkedIn
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Why Join Section */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="py-20 px-4"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold proxima-bold text-white text-center mb-16"
                    >
                        Why Join QuidAI?
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                                >
                                    <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-colors duration-300 backdrop-blur-sm">
                                        <CardHeader>
                                            <div className="mb-4 p-3 bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] rounded-lg w-fit">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <CardTitle className="text-white proxima-bold text-lg mb-2">
                                                {benefit.title}
                                            </CardTitle>
                                            <CardDescription className="text-white/70 proxima-small leading-relaxed">
                                                {benefit.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* How It Works Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="py-20 px-4 bg-white/5 backdrop-blur-sm"
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold proxima-bold text-white text-center mb-16">
                        How It Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: LogIn,
                                title: "Step 1: Click and Login with LinkedIn",
                                description:
                                    "Connect your LinkedIn profile in seconds to get started.",
                            },
                            {
                                icon: Edit,
                                title: "Step 2: Upload Projects & Availability",
                                description:
                                    "Showcase your best work and let clients know when you are available.",
                            },
                            {
                                icon: Rocket,
                                title: "Step 3: Submit & Get Verified",
                                description:
                                    "Submit your profile for verification and start receiving opportunities.",
                            },
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                                    className="relative"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold proxima-bold text-white mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/70 proxima-small">{item.description}</p>
                                    </div>

                                    {/* Arrow connector (hidden on mobile) */}
                                    {idx < 2 && (
                                        <div className="hidden md:block absolute top-8 -right-4 w-8 h-1 bg-gradient-to-r from-[#425BFF] to-transparent"></div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="py-20 px-4"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <Card className="bg-gradient-to-r from-[#425BFF]/20 to-[#7C2BD3]/20 border border-white/30 backdrop-blur-sm">
                        <CardHeader className="p-8 md:p-12">
                            <CardTitle className="text-3xl md:text-4xl proxima-bold text-white mb-4">
                                Ready to Showcase Your AI Expertise?
                            </CardTitle>
                            <CardDescription className="text-white/80 proxima-large text-base mb-8">
                                Join thousands of AI experts already making an impact and earning from their skills.
                            </CardDescription>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={handleLinkedInSignUp}
                                    className="bg-gradient-to-r from-[#425BFF] to-[#0066ff] hover:from-[#3a4fd1] hover:to-[#0052cc] text-white px-12 py-6 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                                    </svg>
                                    Get Started Today
                                </Button>
                            </motion.div>
                        </CardHeader>
                    </Card>
                </div>
            </motion.section>

            {/* Footer Info */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="py-12 px-4 border-t border-white/10 text-center"
            >
                <p className="text-white/60 proxima-small text-sm max-w-2xl mx-auto">
                    Your LinkedIn profile is secure and only used to populate your professional
                    information. We never post on your behalf or access private messages. Join
                    today and start your journey as an AI expert.
                </p>
            </motion.div>
        </div>
    );
};

export default JoinAsAIExpert;
