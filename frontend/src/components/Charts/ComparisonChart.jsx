/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    Tooltip,
    Legend,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

// Registrasi plugin termasuk Filler
ChartJS.register(LineElement, Tooltip, Legend, Filler, CategoryScale, LinearScale, PointElement);

const ComparisonChart = ({ currentData, previousData, timeFilter }) => {
    const chartData = useMemo(() => {
        // Gunakan properti created_at untuk label
        const labels = currentData.map(item => {
            const d = new Date(item.created_at);
            return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString("id-ID");
        });

        const currentValues = currentData.map(item => item.value);
        const previousValues = previousData.map(item => item.value);

        return {
            labels,
            datasets: [
                {
                    label: `Emisi ${timeFilter === 'weekly' ? 'Minggu' : 'Bulanan'} Ini`,
                    data: currentValues,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
                {
                    label: `Emisi ${timeFilter === 'weekly' ? 'Minggu' : 'Bulanan'} Lalu`,
                    data: previousValues,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                }
            ]
        };
    }, [currentData, previousData, timeFilter]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium mb-4">Perbandingan Emisi</h3>
            <Line data={chartData} />
        </div>
    );
};

export default ComparisonChart;
