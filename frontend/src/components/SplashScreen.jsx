/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onAnimationComplete }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
            onAnimationComplete();
        }, 3500); // Durasi total splash screen
    }, [onAnimationComplete]);

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 3 }}
            className="fixed inset-0 flex items-center justify-center bg-white z-50 overflow-hidden"
        >
            {/* Logo muncul dengan fade-in */}
            <motion.img
                src="/assets/Logo/logo.svg" // Sesuaikan path logo
                alt="Logo"
                className="w-64 h-64 md:w-128 md:h-128 object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Background hijau menyapu dari bawah ke atas */}
            <motion.div
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-0 w-full bg-[#80B1A7]"
            />
        </motion.div>
    );
}
