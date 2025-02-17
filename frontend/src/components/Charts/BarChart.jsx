/* eslint-disable react/prop-types */
// src/components/Charts/EmissionBarChart.jsx
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: { display: false },
            title: { display: true, text: "Bulan" }
        },
        y: {
            beginAtZero: true,
            title: { display: true, text: "Pengurangan Emisi (kg CO₂)" }
        },
    },
    plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
    },
};

export default function EmissionBarChart({ data, className }) {
    return (
        <div className={className}>
            <Bar data={data} options={chartOptions} />
        </div>
    );
}
