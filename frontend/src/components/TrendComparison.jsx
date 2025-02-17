/* eslint-disable react/prop-types */
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const TrendComparison = ({ data, yearFilter, emissionData }) => {
    if (data.length === 0) {
        return <p className="text-gray-500">Tidak ada data untuk tahun ini.</p>;
    }

    const prevYear = yearFilter - 1;
    const currentYearTotal = data.reduce((sum, item) => sum + item.value, 0);
    const prevYearTotal = emissionData
        .filter(item => new Date(item.date).getFullYear() === prevYear)
        .reduce((sum, item) => sum + item.value, 0);

    const percentageChange = prevYearTotal
        ? (((currentYearTotal - prevYearTotal) / prevYearTotal) * 100).toFixed(1)
        : 0;

    return (
        <div>
            <h3 className="text-lg font-medium mb-4">Perbandingan Tren Emisi</h3>
            <p className="text-gray-700">
                Total Emisi {yearFilter}: <strong>{currentYearTotal.toFixed(1)} kgCO₂</strong>
            </p>
            <p className="text-gray-700">
                Total Emisi {prevYear}: <strong>{prevYearTotal.toFixed(1)} kgCO₂</strong>
            </p>
            <div className="mt-2 flex items-center space-x-2">
                {percentageChange >= 0 ? (
                    <ArrowUpIcon className="w-6 h-6 text-red-500" />
                ) : (
                    <ArrowDownIcon className="w-6 h-6 text-green-500" />
                )}
                <p className={`${percentageChange >= 0 ? "text-red-500" : "text-green-500"} font-semibold`}>
                    {Math.abs(percentageChange)}% dari tahun sebelumnya
                </p>
            </div>
        </div>
    );
};

export default TrendComparison;
