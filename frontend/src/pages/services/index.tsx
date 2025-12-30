import React from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase,
    Clock,
    Users,
    Zap,
    Target,
    TrendingUp,
} from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
    const router = useRouter();

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
                ease: 'easeOut',
            },
        },
    };

    const services = [
        {
            icon: Briefcase,
            title: 'Consulting & Brain Rental',
            description: 'Solve any AI problem with on-demand expert consulting. Get strategic guidance, technical expertise, and hands-on support from top AI professionals.',
            duration: 'Flexible',
            cta: 'Request a Consultation',
            ctaLink: '/search',
        },
        {
            icon: Users,
            title: 'AI Training & Upskilling',
            description: 'Corporate AI Training, University Partnerships, and customized learning programs. Empower your team with cutting-edge AI knowledge and skills.',
            duration: 'Programs available',
            cta: 'Enroll in a Program',
            ctaLink: '/search',
        },
        {
            icon: Target,
            title: 'AI Project Execution',
            description: 'Custom AI solutions for businesses. From concept to deployment, our experts deliver end-to-end AI projects tailored to your needs.',
            duration: 'Project-based',
            cta: 'Talk to Our AI Team',
            ctaLink: '/search',
        },
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#1a1a3e] to-[#0a0e27]">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="pt-20 pb-12 px-4"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#425BFF]/30 to-[#7C2BD3]/30 border border-[#425BFF]/50">
                        <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] proxima-bold">
                            🚀 COMPREHENSIVE AI SOLUTIONS
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold proxima-bold text-white mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#425BFF] to-[#7C2BD3]">Services</span>
                    </h1>
                    <p className="text-xl text-white/80 proxima-large">
                        From consulting to training to full project execution, we provide end-to-end AI solutions tailored to your business needs.
                    </p>
                </div>
            </motion.div>

            {/* Services Grid */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="py-20 px-4"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                                >
                                    <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-[#425BFF]/50 transition-all duration-300 backdrop-blur-sm group">
                                        <CardHeader className="space-y-6 p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="p-3 bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                    <Icon className="w-7 h-7 text-white" />
                                                </div>
                                                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 proxima-small">
                                                    {service.duration}
                                                </span>
                                            </div>
                                            <div>
                                                <CardTitle className="text-white proxima-bold text-xl mb-3">
                                                    {service.title}
                                                </CardTitle>
                                                <CardDescription className="text-white/70 proxima-small leading-relaxed text-base">
                                                    {service.description}
                                                </CardDescription>
                                            </div>
                                            <div className="pt-4">
                                                <Button
                                                    onClick={() => router.push(service.ctaLink)}
                                                    className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] hover:from-[#3a4fd1] hover:to-[#6b23a9] text-white font-semibold proxima-bold transition-all duration-300 shadow-lg"
                                                >
                                                    {service.cta}
                                                </Button>
                                            </div>
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
                className="py-16 px-4 bg-white/5 backdrop-blur-sm border-y border-white/10"
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold proxima-bold text-white text-center mb-12">
                        Getting Started
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: '1', title: 'Define Your Needs', desc: 'Tell us what you\'re looking for' },
                            { step: '2', title: 'Browse Talent', desc: 'Explore our verified AI experts' },
                            { step: '3', title: 'Connect & Discuss', desc: 'Talk directly with candidates' },
                            { step: '4', title: 'Hire & Collaborate', desc: 'Start working together' },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative text-center"
                            >
                                <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] flex items-center justify-center mx-auto">
                                    <span className="text-white font-bold proxima-bold">{item.step}</span>
                                </div>
                                <h3 className="text-white font-semibold proxima-bold mb-2">{item.title}</h3>
                                <p className="text-white/60 text-sm proxima-small">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="py-16 px-4"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <Card className="bg-gradient-to-br from-[#425BFF]/20 via-[#7C2BD3]/10 to-transparent border-2 border-[#425BFF]/40 backdrop-blur-sm relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#425BFF]/20 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#7C2BD3]/20 to-transparent rounded-full blur-3xl"></div>

                        <CardHeader className="p-8 md:p-12 relative z-10">
                            <CardTitle className="text-3xl md:text-4xl proxima-bold text-white mb-4">
                                Not Sure What You Need?
                            </CardTitle>
                            <CardDescription className="text-white/80 proxima-large text-lg mb-8">
                                Contact us for tailored AI solutions. Our team will help you identify the best approach for your specific requirements.
                            </CardDescription>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col sm:flex-row justify-center gap-4"
                            >
                                <Button
                                    onClick={() => router.push('/search')}
                                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] text-white font-semibold hover:from-[#3a4fd1] hover:to-[#6b23a9] transition-all duration-300 shadow-lg text-base"
                                >
                                    Get in Touch
                                </Button>
                                <Button
                                    onClick={() => router.push('/search')}
                                    variant="outline"
                                    className="px-8 py-4 rounded-full border-2 border-white/30 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all duration-300 text-base"
                                >
                                    Browse AI Experts
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
                    All services are customizable to meet your unique needs. Contact us for detailed pricing, custom packages, and enterprise solutions.
                </p>
            </motion.div>
        </div>
    );
};

export default ServicesPage;
