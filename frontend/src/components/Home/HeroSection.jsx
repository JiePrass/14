import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const images = [
    "/assets/images/hero-1.jpg",
    "/assets/images/hero-2.jpg",
    "/assets/images/hero-3.jpg"
];

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[400px] md:h-[600px] flex items-end p-6 md:p-10 rounded-lg overflow-hidden">
            {/* Background Carousel */}
            <div className="absolute inset-0 w-full h-full">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
                        animate={{ opacity: currentIndex === index ? 1 : 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center md:text-left text-white max-w-lg">
                <h1 className="text-lg md:text-4xl font-bold leading-tight">
                    Hitung Emisi & Hidup Lebih Ramah Lingkungan
                </h1>
                <p className="text-xs md:text-lg mt-2 md:mt-4">
                    Ketahui jejak karbonmu, ubah kebiasaan dengan seru, dan dapatkan hadiah lewat misi harian!
                </p>
                <Link
                    to="/login"
                    className="text-xs mt-4 md:mt-6 bg-[#619086] hover:bg-[#80B1A7] text-[#F4F4F4] font-semibold px-4 py-2 md:px-6 md:py-3 rounded-lg transition inline-block"
                >
                    Hitung Sekarang!
                </Link>
            </div>
        </div>
    );
}
