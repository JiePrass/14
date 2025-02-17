/* eslint-disable react/prop-types */
const HistoryDistribution = ({ data }) => {
    if (data.length === 0) {
        return <p className="text-gray-500">Tidak ada data untuk tahun ini.</p>;
    }

    // Mengelompokkan data berdasarkan kategori
    const categoryTotals = data.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.value;
        return acc;
    }, {});

    // Hitung total emisi semua kategori
    const totalEmissions = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

    return (
        <div>
            <h3 className="text-lg font-medium mb-4">Distribusi Emisi Karbon</h3>
            <ul className="space-y-2">
                {Object.entries(categoryTotals).map(([category, value], index) => {
                    const percentage = ((value / totalEmissions) * 100).toFixed(1);
                    return (
                        <li key={index} className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">{category}</span>
                            <span className="text-gray-600">{percentage}% ({value.toFixed(1)} kgCO₂)</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default HistoryDistribution;
