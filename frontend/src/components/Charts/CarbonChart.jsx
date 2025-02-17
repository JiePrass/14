/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Filler } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Filler) // Tambahkan Filler di sini

export default function CarbonChart({ data }) {
    const groupedData = data.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.value
        return acc
    }, {})

    const chartData = {
        labels: Object.keys(groupedData),
        datasets: [
            {
                label: 'Emisi Karbon (kgCO2)',
                data: Object.values(groupedData),
                backgroundColor: [
                    '#34d399',
                    '#60a5fa',
                    '#fbbf24',
                    '#f472b6',
                    '#a78bfa'
                ],
                hoverOffset: 4,
                fill: true // Tetap gunakan opsi fill jika memang diperlukan
            }
        ]
    }

    return (
        <div>
            <h3 className="text-lg font-medium mb-4">Distribusi Emisi per Kategori</h3>
            <Doughnut data={chartData} />
        </div>
    )
}
