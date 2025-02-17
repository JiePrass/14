import { Link } from 'react-router-dom';

export default function FooterApp() {
    return (
        <footer className="bg-[#333333] text-[#f4f4f4] mb-8 rounded-2xl mx-10">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Bagian atas footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Branding dan Tagline */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-3xl font-bold">JejakKarbon</h2>
                        <p className="text-[#f4f4f4] mt-2">
                            Jejakmu, Masa Depan Bumi. Ayo Hitung, Kurangi, Hijaukan!
                        </p>
                    </div>
                    {/* Navigasi */}
                    <nav className="flex flex-wrap gap-4">
                        <Link to="/" className="hover:text-green-400 transition-colors">
                            Beranda
                        </Link>
                        <Link to="/calculator" className="hover:text-green-400 transition-colors">
                            Kalkulator
                        </Link>
                        <Link to="/dashboard" className="hover:text-green-400 transition-colors">
                            Dasbor
                        </Link>
                        <Link to="/leaderboard" className="hover:text-green-400 transition-colors">
                            Papan Peringkat
                        </Link>
                    </nav>
                </div>

                {/* Garis Pemisah */}
                <hr className="border-[#f4f4f4]/80 my-6" />

                {/* Bagian bawah footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-[#f4f4f4]">
                    <div className="text-sm text-center md:text-left">
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
