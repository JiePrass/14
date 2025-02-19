import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import api from '../../../services/api';

export default function Header() {
    const [user, setUser] = useState({ username: "User", email: "user@example.com", profilePic: "https://placehold.co/400" });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            api.get("/profile", { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setUser({
                        username: response.data.name,
                        email: response.data.email,
                        profilePic: `http://localhost:2304${response.data.profile_picture}`
                    });
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    localStorage.removeItem("token");
                });
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <header className="bg-white py-4 px-12 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
            <Link to="/" className="max-w-48">
                <img src="/assets/Logo/logo.svg" alt="Logo" />
            </Link>

            {/* Hamburger Menu */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <XMarkIcon className="w-8 h-8 text-gray-700" /> : <Bars3BottomLeftIcon className="w-8 h-8 text-gray-700" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
                {["Home", "Calculator", "Dashboard", "Leaderboard"].map((item) => (
                    <Link key={item} to={`/${item.toLowerCase()}`} className="text-gray-600 hover:text-green-600 transition duration-300">
                        {item}
                    </Link>
                ))}
            </nav>

            {/* User Profile Dropdown */}
            <div className="relative hidden md:block" ref={dropdownRef}>
                {isAuthenticated ? (
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-3 relative z-20 focus:outline-none">
                        <img src={user.profilePic || '/assets/icons/person.png'} alt="User" className="w-10 h-10 rounded-full" />
                        <span className="text-gray-700 font-medium hidden sm:block">{user.username}</span>
                    </button>
                ) : (
                    <Link to="/login" className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300">
                        Sign In
                    </Link>
                )}
                <AnimatePresence>
                    {dropdownOpen && isAuthenticated && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-12 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-30"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img src={user.profilePic} alt="User" className="w-12 h-12 rounded-full border" />
                                    <div>
                                        <p className="text-gray-700 font-medium">{user.username}</p>
                                        <p className="text-gray-500 text-sm">{user.email}</p>
                                    </div>
                                </div>
                                <button onClick={() => setDropdownOpen(false)} className="text-gray-500 hover:text-red-500 text-lg">✕</button>
                            </div>
                            <div className="mt-4 border-t pt-3 space-y-2">
                                <Link to="/profile" className="block text-gray-600 hover:text-green-600 transition">
                                    Lihat Selengkapnya
                                </Link>
                                <button onClick={handleLogout} className="w-full text-left text-red-500 hover:text-red-700 transition">
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col z-50"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-700">Menu</h2>
                            <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-red-500 text-lg">✕</button>
                        </div>
                        {isAuthenticated && (
                            <div className="flex items-center space-x-3 mb-4">
                                <img src={user.profilePic} alt="User" className="w-12 h-12 rounded-full border" />
                                <div>
                                    <p className="text-gray-700 font-medium">{user.username}</p>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                </div>
                            </div>
                        )}
                        {["Home", "Calculator", "Dashboard", "Leaderboard"].map((item) => (
                            <Link key={item} to={`/${item.toLowerCase()}`} className="block text-gray-600 hover:text-green-600 transition py-2">
                                {item}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
