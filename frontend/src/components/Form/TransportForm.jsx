/* eslint-disable react/prop-types */
// src/components/Form/TransportForm.jsx
function TransportForm({ data, setData }) {
    const transportEmissionFactors = {
        Mobil: 0.21,
        Motor: 0.15,
        Bus: 0.30,
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transportasi</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Jenis Kendaraan
                </label>
                <select
                    name="vehicleType"
                    value={data.vehicleType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih kendaraan</option>
                    {Object.keys(transportEmissionFactors).map((vehicle) => (
                        <option key={vehicle} value={vehicle}>
                            {vehicle}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Jarak Tempuh (km)
                </label>
                <input
                    name="distance"
                    type="number"
                    value={data.distance}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan jarak tempuh"
                />
            </div>
        </div>
    )
}

export default TransportForm
