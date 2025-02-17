/* eslint-disable react/prop-types */
// src/components/Form/ElectricityForm.jsx
function ElectricityForm({ data, setData }) {
    const vaOptions = ['450', '900']

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Listrik</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Daya Listrik (VA)
                </label>
                <select
                    name="va"
                    value={data.va}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih daya listrik</option>
                    {vaOptions.map((option) => (
                        <option key={option} value={option}>
                            {option} VA
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Penggunaan (kWh)
                </label>
                <input
                    name="usage"
                    type="number"
                    value={data.usage}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan penggunaan listrik"
                />
            </div>
        </div>
    )
}

export default ElectricityForm
