/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "../../services/api";

export default function Profile({ handleLogout, emissionData }) {
    const [profile, setProfile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [previewPic, setPreviewPic] = useState(null);
    const [newUsername, setNewUsername] = useState(""); // Tambahkan state ini!
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/profile");
                setProfile(response.data);
                setNewUsername(response.data.name); // Set username awal dari API
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return <div className="text-center py-8">Loading profile...</div>;
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfilePic(file);
            setPreviewPic(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            if (newProfilePic) {
                formData.append("profile_picture", newProfilePic);
            }
            formData.append("name", newUsername); // Kirim username baru

            await api.put("/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setIsModalOpen(false);
            window.location.reload(); // Refresh untuk melihat perubahan
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const { point, achievements } = profile;

    const totalCO2 = emissionData && emissionData.emissions
        ? emissionData.emissions.reduce((acc, item) => acc + (item.value || 0), 0)
        : 0;

    // Jika ranking tidak tersedia dari API, kita bisa menetapkan placeholder
    const ranking = profile.ranking || "###";
    const joinedSince = dayjs(profile.create_at).format("YYYY MM DD");
    console.log(joinedSince)

    return (
        <div className="space-y-6 p-4">
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center space-y-4 relative">
                <button
                    className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    Edit Profile
                </button>
                <img
                    src={`http://localhost:2304${profile.profile_picture}` || "https://placehold.co/400x400"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover"
                />
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-md text-gray-500">Joined Since: {joinedSince}</p>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600">
                    LOGOUT
                </button>
            </div>

            {/* Empat Kotak Ringkasan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Ranking */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Ranking</h4>
                    <p className="text-3xl font-bold text-purple-500">{ranking}</p>
                </div>
                {/* Total CO₂ */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Total CO₂</h4>
                    <p className="text-3xl font-bold text-red-500">{totalCO2} kg</p>
                </div>
                {/* Total Poin */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Total Poin</h4>
                    <p className="text-3xl font-bold text-green-600">{point}</p>
                </div>
            </div>

            {console.log(achievements)}

            {/* Pencapaian */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Pencapaian</h2>
                {achievements && achievements.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        {achievements.map((ach, index) => (
                            <li key={index}>
                                <strong>{ach.name}:</strong> {ach.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Tidak ada pencapaian.</p>
                )}
            </div>

            {/* MODAL BOX */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold text-center mb-4">Edit Profil</h2>

                        {/* Input Username */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-1">Username</label>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="block w-full border border-gray-300 p-2 rounded-md"
                            />
                        </div>

                        {/* Preview Gambar */}
                        <div className="flex justify-center mb-4">
                            <img
                                src={previewPic || `http://localhost:2304${profile.profile_picture}`}
                                alt="Preview"
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                            />
                        </div>

                        {/* Input File */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full border border-gray-300 p-2 rounded-md"
                        />

                        {/* Tombol Upload */}
                        <button
                            onClick={handleUpload}
                            className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600 transition disabled:bg-gray-400"
                            disabled={!newProfilePic && newUsername === profile.name || isLoading}
                        >
                            {isLoading ? "Uploading..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
