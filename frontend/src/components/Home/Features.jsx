/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
    {
        "title": "Kalkulator Jejak Karbon",
        "shortDesc": "Hitung emisi karbon yang dikeluarkan dari aktivitas sehari-hari.",
        "longDesc": "Masukkan aktivitas harianmu dan dapatkan estimasi emisi karbon yang dihasilkan, lengkap dengan tips untuk menguranginya.",
        "image": "/assets/images/kalkulator.jpg",
        "link": "/calculator"
    },
    {
        "title": "Dashboard Informatif",
        "shortDesc": "Tinjau aktivitas sehari-hari kamu dengan lebih mudah.",
        "longDesc": "Lihat grafik dan statistik emisi karbon harian, mingguan, atau bulanan untuk memantau serta membandingkan pengurangan emisi dari waktu ke waktu.",
        "image": "/assets/images/dashboard.jpg",
        "link": "/dashboard"
    },
    {
        "title": "Gamifikasi Seru",
        "shortDesc": "Kurangi emisi, kumpulkan poin, dan dapatkan hadiah.",
        "longDesc": "Dapatkan poin setiap kali kamu mengurangi emisi, selesaikan tantangan ramah lingkungan, dan tukarkan poin dengan reward menarik.",
        "image": "/assets/images/game.jpg",
        "link": "/gamification"
    }
];

function FeatureCard({ feature }) {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className="relative w-full md:w-1/3 h-[200px] md:h-[500px] bg-cover bg-center rounded-lg overflow-hidden transition cursor-pointer"
            style={{ backgroundImage: `url(${feature.image})` }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate(feature.link)}
        >
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black/20 transition-all duration-500 ${hover ? "bg-opacity-80" : "bg-opacity-50"}`}></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className={`transition-all duration-500 text-md md:text-xl font-bold ${hover ? "opacity-0" : "opacity-100"}`}>{feature.title}</h3>
                <p className={`transition-all text-xs md:text-base duration-500 ${hover ? "opacity-0" : "opacity-100"}`}>
                    {feature.shortDesc}
                </p>

                {/* Deskripsi panjang dengan efek naik */}
                <div className={`absolute bottom-6 left-6 right-6 text-xs md:text-sm transition-all duration-500 ${hover ? "opacity-100 translate-y-[-10px]" : "opacity-0 translate-y-4"}`}>
                    {feature.longDesc}
                </div>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <div className="mt-10">
            <h1 className="text-lg text-center md:text-left md:text-4xl font-bold leading-tight">Jelajahi Fitur Utama &<br />Mulai Aksi Nyata!</h1>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-10 mt-5">
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} />
                ))}
            </div>
        </div>
    );
}
