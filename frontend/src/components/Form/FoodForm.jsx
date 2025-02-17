/* eslint-disable react/prop-types */
// src/components/Form/FoodForm.jsx
function FoodForm({ data, setData }) {
    const foodEmissionFactors = {
        Daging: 0.15,
        Sayuran: 0.05,
        Buah: 0.03,
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Makanan</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Jenis Makanan
                </label>
                <select
                    name="foodType"
                    value={data.foodType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih jenis makanan</option>
                    {Object.keys(foodEmissionFactors).map((food) => (
                        <option key={food} value={food}>
                            {food}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Jumlah Konsumsi
                </label>
                <input
                    name="consumption"
                    type="number"
                    value={data.consumption}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan jumlah konsumsi"
                />
            </div>
        </div>
    )
}

export default FoodForm
