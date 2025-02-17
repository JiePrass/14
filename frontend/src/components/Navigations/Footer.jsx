import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#333333] text-[#f4f4f4] p-6">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Bagian atas footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    {/* Branding dan Tagline */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-3xl font-bold">JejakKarbon</h2>
                        <p className="text-[#f4f4f4] mt-2 max-w-xs">
                            Jejakmu, Masa Depan Bumi. Ayo Hitung, Kurangi, Hijaukan!
                        </p>
                    </div>
                    {/* Navigasi */}
                    <nav className="flex flex-wrap justify-center md:justify-end gap-6">
                        <Link to="/" className="hover:text-[#80B1A7] transition-colors">
                            Beranda
                        </Link>
                        <Link to="/calculator" className="hover:text-[#80B1A7] transition-colors">
                            Kalkulator
                        </Link>
                        <Link to="/dashboard" className="hover:text-[#80B1A7] transition-colors">
                            Dasbor
                        </Link>
                        <Link to="/leaderboard" className="hover:text-[#80B1A7] transition-colors">
                            Papan Peringkat
                        </Link>
                    </nav>
                </div>

                {/* Garis Pemisah */}
                <hr className="border-[#f4f4f4]/50 my-6" />

                {/* Bagian bawah footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-[#f4f4f4]">
                    <div className="text-sm space-y-1">
                        <p>Bogor, Indonesia</p>
                        <p>WellPlayed</p>
                        <p>2024-2025</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-sm">
                        © 2025 Carbon Tracker. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
