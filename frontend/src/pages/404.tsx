'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { ArrowLeft, Home } from 'lucide-react';

export default function Custom404() {
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1a3e] to-[#0a0e27] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-md w-full text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 404 Text */}
                <motion.div variants={itemVariants}>
                    <div className="relative mb-8">
                        <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] bg-clip-text text-transparent">
                            404
                        </h1>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#425BFF]/20 to-[#7C2BD3]/20 blur-3xl -z-10" />
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.div variants={itemVariants}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 proxima-large">
                        Page Not Found
                    </h2>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants}>
                    <p className="text-white/70 mb-8 text-lg proxima-regular">
                        Oops! The page you're looking for doesn't exist or has been moved. Don't worry, we'll help you find your way back.
                    </p>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    variants={itemVariants}
                    className="mb-10 space-y-2"
                >
                    <div className="h-1 w-16 bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] rounded-full mx-auto" />
                    <div className="h-1 w-24 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] rounded-full mx-auto" />
                </motion.div>

                {/* Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 hover:text-white flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </Button>
                    <Button
                        onClick={() => router.push('/')}
                        className="bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] hover:from-[#425BFF]/90 hover:to-[#7C2BD3]/90 text-white flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Button>
                </motion.div>

                {/* Alternative Links */}
                <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-white/60 text-sm mb-4 proxima-regular">
                        Try exploring:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => router.push('/search')}
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition text-sm"
                        >
                            Search Talent
                        </button>
                        <button
                            onClick={() => router.push('/insights')}
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition text-sm"
                        >
                            Insights
                        </button>
                        <button
                            onClick={() => router.push('/services')}
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition text-sm"
                        >
                            Services
                        </button>
                        <button
                            onClick={() => router.push('/join-as-ai-expert')}
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition text-sm"
                        >
                            Join as Expert
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
