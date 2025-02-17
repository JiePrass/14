/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import {
    XMarkIcon,
    Bars3BottomLeftIcon,
    HomeIcon,
    CalculatorIcon,
    ClockIcon,
    UserIcon,
    UsersIcon,
    TrophyIcon,
    ClipboardDocumentListIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ sidebarOpen, setSidebarOpen, isCollapsed, setIsCollapsed }) => {
    const navigation = [
        { name: 'Dashbor', href: '/dashboard', icon: <HomeIcon className="w-6 h-6" /> },
        { name: 'Kalkulator Karbon', href: '/calculator', icon: <CalculatorIcon className="w-6 h-6" /> },
        { name: 'Riwayat', href: '/history', icon: <ClockIcon className="w-6 h-6" /> },
        { name: 'Komunitas', href: '/community', icon: <UsersIcon className="w-6 h-6" /> },
        { name: 'Papan Misi', href: '/missions', icon: <ClipboardDocumentListIcon className="w-6 h-6" /> },
        { name: 'Papan Peringkat', href: '/leaderboard', icon: <TrophyIcon className="w-6 h-6" /> },
        { name: 'Profil', href: '/profile', icon: <UserIcon className="w-6 h-6" /> },
        { name: 'Kembali', href: '/home', icon: <ArrowLeftOnRectangleIcon className="w-6 h-6" /> }
    ];

    return (
        <>
            {/* Overlay untuk Mobile */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 z-30 bg-black/50"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar (tanpa fixed pada desktop) */}
            <aside className="h-full bg-white shadow-lg transition-all duration-300">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center p-4">
                        <img src="/assets/Logo/logo.svg" alt="Logo" className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-full"}`} />
                        {/* Tombol collapse (hanya di desktop) */}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden md:block p-2 hover:bg-gray-100 rounded-lg "
                        >
                            <Bars3BottomLeftIcon className={`w-6 h-6 transform transition-transform duration-300 ${isCollapsed && "rotate-180"}`} />
                        </button>
                    </div>

                    {/* Menu Navigasi */}
                    <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center p-3 rounded-lg hover:bg-emerald-50 group transition-colors ${isCollapsed ? "justify-center" : ""}`}
                            >
                                {item.icon}
                                <span className={`ml-3 transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-full"}`}>
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Tombol tutup untuk Mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden p-4 text-gray-500 hover:text-gray-700"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
