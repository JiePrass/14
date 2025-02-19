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
        // Fungsi untuk mengelompokkan data berdasarkan tanggal
        const groupByDate = (data) => {
            return data.reduce((acc, item) => {
                const d = new Date(item.created_at);
                // Jika tanggal tidak valid, gunakan "N/A"
                const key = isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString("id-ID");
                // Tambahkan value jika tanggal sudah ada, atau inisialisasi jika belum ada
                acc[key] = (acc[key] || 0) + item.value;
                return acc;
            }, {});
        };

        // Kelompokkan data untuk currentData dan previousData
        const currentGrouped = groupByDate(currentData);
        const previousGrouped = groupByDate(previousData);

        // Gabungkan semua tanggal unik dari kedua data
        const allDatesSet = new Set([
            ...Object.keys(currentGrouped),
            ...Object.keys(previousGrouped)
        ]);
        let labels = Array.from(allDatesSet);

        // Urutkan tanggal (jika memungkinkan)
        labels.sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;
            return dateA - dateB;
        });

        // Buat array nilai berdasarkan label (jika tanggal tidak ada, nilai default 0)
        const currentValues = labels.map(date => currentGrouped[date] || 0);
        const previousValues = labels.map(date => previousGrouped[date] || 0);

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
