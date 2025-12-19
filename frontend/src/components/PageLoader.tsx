'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoaderProps {
    isLoading: boolean;
}

export const PageLoader: React.FC<LoaderProps> = ({ isLoading }) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1a3e] to-[#0a0e27] flex items-center justify-center z-[9999] pointer-events-none"
                >
                    <div className="flex flex-col items-center justify-center gap-6">
                        {/* Animated Logo/Brand */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    className="w-12 h-12 rounded-full border-3 border-transparent border-t-white border-r-white/50"
                                />
                            </div>
                        </motion.div>

                        {/* Loading Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-center"
                        >
                            <h3 className="text-white text-lg font-semibold proxima-large mb-2">
                                Loading
                            </h3>
                            <motion.p
                                className="text-white/60 text-sm proxima-regular"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                Please wait...
                            </motion.p>
                        </motion.div>

                        {/* Animated Dots */}
                        <motion.div className="flex gap-2">
                            {[0, 1, 2].map((dot) => (
                                <motion.div
                                    key={dot}
                                    className="w-2 h-2 rounded-full bg-gradient-to-r from-[#425BFF] to-[#7C2BD3]"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: dot * 0.1,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
