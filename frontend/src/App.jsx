import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { fetchEmissionData } from "../services/api"; // Import fungsi fetch
import Sidebar from "./components/Navigations/Sidebar";
import FloatingToggleButton from "./components/Navigations/FloatingToggleButton";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import CarbonCalculator from "./pages/CarbonCalculator";
import CommunityPage from "./pages/CommunityPage";
import MissionsPage from "./pages/MissionsPage";
import Leaderboard from "./pages/Leaderboard"
import Login from "./pages/Login";
import Register from "./pages/Register";
import FooterApp from "./components/Navigations/FooterApp";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [emissionData, setEmissionData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);

      if (token) {
        fetchEmissionData().then((data) => {
          setEmissionData(data);
          setLoading(false); // Data sudah siap, loading selesai
        });
      } else {
        setLoading(false); // Tidak ada token, loading selesai
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (loading) {
    // Tampilkan spinner atau placeholder sampai pengecekan selesai
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#FBFBFB] overflow-x-hidden relative">
        <Routes>
          <Route path="/" element={<Home setLogout={handleLogout} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <>
                  <div className="hidden md:block">
                    <div
                      className={`fixed top-0 left-0 h-full transition-all duration-300 z-40 
                        ${sidebarOpen ? (isCollapsed ? "w-20" : "w-64") : "w-0"}
                      `}
                    >
                      <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        onLogout={handleLogout}
                      />
                    </div>
                    <div
                      className={`transition-all duration-300 ${sidebarOpen ? (isCollapsed ? "ml-20" : "ml-64") : "ml-0"}`}
                    >
                      <FloatingToggleButton setSidebarOpen={setSidebarOpen} />
                      <main className="p-6">
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard emissionData={emissionData} />} />
                          <Route path="/history" element={<History emissionData={emissionData} />} />
                          <Route path="/calculator" element={<CarbonCalculator />} />
                          <Route path="/community" element={<CommunityPage />} />
                          <Route path="/missions" element={<MissionsPage />} />
                          <Route path="/leaderboard" element={<Leaderboard />} />
                          <Route path="/profile" element={<Profile handleLogout={handleLogout} emissionData={emissionData} />} />
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      </main>
                      <FooterApp />
                    </div>
                  </div>

                  <div className="md:hidden">
                    <FloatingToggleButton setSidebarOpen={setSidebarOpen} />
                    <main className="p-6">
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard emissionData={emissionData} />} />
                        <Route path="/history" element={<History emissionData={emissionData} />} />
                        <Route path="/calculator" element={<CarbonCalculator />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/missions" element={<MissionsPage />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </main>
                    <FooterApp />
                    <div
                      className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg transition-transform duration-300
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        ${isCollapsed ? "w-20" : "w-64"}
                      `}
                    >
                      <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        onLogout={handleLogout}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}