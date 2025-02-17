/* eslint-disable react/prop-types */
// src/components/Form/OtherActivityForm.jsx
function OtherActivityForm({ data, setData }) {
    const otherActivityOptions = [
        "Belanja Online",
        "Penggunaan Gadget",
        "Rekreasi",
        "Bekerja dari Rumah",
    ];

    // Base emission untuk masing-masing aktivitas (misalnya per jam)
    const otherActivityEmissionMapping = {
        "Belanja Online": 0.5,      // 0.5 kg CO₂ per jam
        "Penggunaan Gadget": 0.3,
        "Rekreasi": 0.7,
        "Bekerja dari Rumah": 0.4,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Aktivitas Lainnya
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Pilih Aktivitas
                </label>
                <select
                    name="activity"
                    value={data.activity || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih aktivitas</option>
                    {otherActivityOptions.map((act) => (
                        <option key={act} value={act}>
                            {act}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Durasi (jam)
                </label>
                <input
                    type="number"
                    name="duration"
                    value={data.duration || ""}
                    onChange={handleChange}
                    placeholder="Masukkan durasi dalam jam"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Frekuensi (kali per minggu)
                </label>
                <input
                    type="number"
                    name="frequency"
                    value={data.frequency || ""}
                    onChange={handleChange}
                    placeholder="Masukkan frekuensi per minggu"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                />
            </div>
            {data.activity && data.duration && data.frequency && (
                <p className="mt-2 text-gray-800 font-medium">
                    {/* Contoh perhitungan secara langsung (opsional) */}
                    Perkiraan Emisi:{" "}
                    {(
                        (otherActivityEmissionMapping[data.activity] || 0) *
                        Number(data.duration) *
                        Number(data.frequency)
                    ).toFixed(2)}{" "}
                    kg CO₂
                </p>
            )}
        </div>
    );
}

export default OtherActivityForm;
