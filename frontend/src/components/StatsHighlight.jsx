/* eslint-disable react/prop-types */
export default function StatsHighlight({ data, previousTotal, timeFilter }) {
    const totalEmission = data.reduce((sum, item) => sum + item.value, 0);
    const previousTotalEmission = previousTotal.reduce((sum, item) => sum + item.value, 0);
    const dailyAverage = (totalEmission / (timeFilter === 'weekly' ? 7 : 30)).toFixed(1);

    let comparisonLabel = "Vs Bulan Lalu";
    if (timeFilter === "weekly") comparisonLabel = "Vs Minggu Lalu";

    const percentageChange = previousTotalEmission
        ? (((totalEmission - previousTotalEmission) / previousTotalEmission) * 100).toFixed(1)
        : 0;
    const comparisonText = `${percentageChange}% ${percentageChange < 0 ? "↓" : "↑"}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-6 rounded-xl">
                <h3 className="text-sm text-emerald-600 font-medium">
                    {timeFilter === "weekly" ? "Total Minggu Ini" : "Total Bulan Ini"}
                </h3>
                <p className="text-2xl font-bold mt-2">{totalEmission} kgCO2</p>
            </div>
            <div className="bg-sky-50 p-6 rounded-xl">
                <h3 className="text-sm text-sky-600 font-medium">Rata-rata Harian</h3>
                <p className="text-2xl font-bold mt-2">{dailyAverage} kgCO2</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl">
                <h3 className="text-sm text-amber-600 font-medium">{comparisonLabel}</h3>
                <p className="text-2xl font-bold mt-2">{comparisonText}</p>
            </div>
        </div>
    );
}
