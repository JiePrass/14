/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Navigations/Header";
import HeroSection from "../components/Home/HeroSection";
import Features from "../components/Home/Features";
import News from "../components/Home/News";
import Contact from "../components/Home/Contact";
import Footer from "../components/Navigations/Footer";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
    const [showSplash, setShowSplash] = useState(true);

    return (
        <div className="min-h-screen bg-[#FBFBFB] relative">
            {/* Splash Screen */}
            <AnimatePresence>
                {showSplash && <SplashScreen onAnimationComplete={() => setShowSplash(false)} />}
            </AnimatePresence>

            {/* Main Content */}
            {!showSplash && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Header />
                    <div className="mx-[40px]">
                        <MotionWrapper>
                            <HeroSection />
                        </MotionWrapper>
                        <MotionWrapper>
                            <Features />
                        </MotionWrapper>
                        <MotionWrapper>
                            <News />
                        </MotionWrapper>
                        <MotionWrapper>
                            <Contact />
                        </MotionWrapper>
                    </div>
                    <Footer />
                </motion.div>
            )}
        </div>
    );
}

function MotionWrapper({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}
