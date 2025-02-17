import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api'; // Pastikan path ini sesuai dengan struktur project-mu

export default function MissionsPage() {
    const [missions, setMissions] = useState([]);
    const [activeMission, setActiveMission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Saat komponen dimount, ambil daftar misi dan misi aktif
    useEffect(() => {
        fetchMissions();
        fetchActiveMission();
    }, []);

    const fetchMissions = async () => {
        try {
            const response = await api.get('/missions');
            // Mengharapkan response: { message: 'Daftar misi berhasil diambil!', missions: [...] }
            setMissions(response.data.missions);
        } catch (err) {
            console.error('Error fetching missions: ', err);
            setError('Gagal mengambil misi, menggunakan dummy data.');
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk mengambil data misi aktif (jika ada)
    const fetchActiveMission = async () => {
        try {
            const response = await api.get('/missions/status'); // Pastikan endpoint ini ada di backend
            if (response.data.activeMission) {
                setActiveMission(response.data.activeMission);
            }
        } catch (err) {
            console.error('Error fetching active mission: ', err);
            // Jika tidak ada misi aktif, tidak perlu mengubah state
        }
    };

    // Fungsi untuk mengambil misi baru
    const handleTakeMission = async (mission) => {
        if (activeMission) {
            return Swal.fire({
                title: 'Misi Aktif!',
                text: 'Anda sudah mengambil misi. Selesaikan misi tersebut terlebih dahulu.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        }
        try {
            await api.post('/missions/take', { missionId: mission.id });
            // Setelah berhasil mengambil misi, kita update activeMission dari backend
            setActiveMission(mission);
            Swal.fire({
                title: 'Berhasil!',
                text: 'Misi berhasil diambil!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            console.error('Error taking mission: ', err);
            Swal.fire({
                title: 'Error',
                text: 'Gagal mengambil misi.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Halaman Misi</h1>

            {activeMission && (
                <div className="bg-green-100 p-4 rounded-md mb-6 shadow-md">
                    <h2 className="text-xl font-semibold">Misi Aktif Anda</h2>
                    <p className="text-gray-700">{activeMission.name}</p>
                    <p className="text-sm text-gray-500">
                        Target: Kurangi {activeMission.target_kgco2} kgCO2
                    </p>
                    <p className="text-sm text-gray-500">Poin: {activeMission.points}</p>
                </div>
            )}

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {missions.map((mission) => (
                        <div
                            key={mission.id}
                            className="border p-6 rounded-md shadow hover:shadow-lg transition-all flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{mission.name}</h3>
                                <p className="text-gray-700 mb-2">{mission.description}</p>
                                <p className="text-gray-500 text-sm">
                                    Target: Kurangi {mission.target_kgco2} kgCO2
                                </p>
                                <p className="text-gray-500 text-sm">Poin: {mission.points}</p>
                            </div>
                            <button
                                onClick={() => handleTakeMission(mission)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Ambil Misi
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
