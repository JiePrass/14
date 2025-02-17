/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import CarbonChart from '../components/Charts/CarbonChart';
import StatsHighlight from '../components/StatsHighlight';
import ComparisonChart from '../components/Charts/ComparisonChart';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';

// Rata-rata emisi karbon global (kg CO₂ per orang per bulan)
const AVERAGE_EMISSION_WEEKLY = 86;
const AVERAGE_EMISSION_MONTHLY = 372.5;

const Dashboard = ({ emissionData = {} }) => {
    // Ekstrak array emissions dari properti emissionData
    const emissions = Array.isArray(emissionData.emissions) ? emissionData.emissions : [];

    // Default filter "all" agar menampilkan semua data
    const [timeFilter, setTimeFilter] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const [totalEmission, setTotalEmission] = useState(0);
    const [averageEmission, setAverageEmission] = useState(0);
    const [previousTotal, setPreviousTotal] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);

    const loadMore = () => {
        setVisibleCount(prev => prev + 5);
    };

    useEffect(() => {
        filterData();
    }, [timeFilter, emissions]);

    const filterData = () => {
        console.log('emissionData:', emissionData);
        console.log('extracted emissions:', emissions);
        if (!emissions.length) {
            setFilteredData([]);
            setTotalEmission(0);
            setAverageEmission(0);
            setPreviousTotal([]);
            return;
        }

        // Jika filter "all", tampilkan semua data
        if (timeFilter === 'all') {
            console.log('Filter: all');
            setFilteredData(emissions);
            const total = emissions.reduce((sum, item) => sum + item.value, 0);
            setTotalEmission(total);
            setAverageEmission(0); // Rata-rata tidak relevan untuk "all"
            setPreviousTotal([]);
            console.log('Filtered Data (all):', emissions);
            return;
        }

        // Untuk weekly dan monthly, filter berdasarkan waktu sistem
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        let filtered = [];
        let previousFiltered = [];

        if (timeFilter === 'weekly') {
            console.log('Filter: weekly');
            const startDate = new Date(now);
            startDate.setDate(now.getDate() - 6);

            const previousStartDate = new Date(startDate);
            previousStartDate.setDate(previousStartDate.getDate() - 7);

            filtered = emissions.filter(item => {
                const itemDate = new Date(item.created_at);
                return itemDate >= startDate && itemDate <= now;
            });

            previousFiltered = emissions.filter(item => {
                const itemDate = new Date(item.created_at);
                return itemDate >= previousStartDate && itemDate < startDate;
            });
        } else if (timeFilter === 'monthly') {
            console.log('Filter: monthly');
            filtered = emissions.filter(item => {
                const itemDate = new Date(item.created_at);
                return (
                    itemDate.getFullYear() === currentYear &&
                    (itemDate.getMonth() + 1) === currentMonth
                );
            });

            previousFiltered = emissions.filter(item => {
                const itemDate = new Date(item.created_at);
                return (
                    itemDate.getFullYear() === currentYear &&
                    (itemDate.getMonth() + 1) === currentMonth - 1
                );
            });
        }

        const total = filtered.reduce((sum, item) => sum + item.value, 0);
        const daysCount =
            timeFilter === 'weekly'
                ? 7
                : timeFilter === 'monthly'
                    ? new Date(currentYear, currentMonth, 0).getDate()
                    : 1;

        setFilteredData(filtered);
        setTotalEmission(total);
        setAverageEmission(total / daysCount);
        setPreviousTotal(previousFiltered.length ? previousFiltered : []);

        console.log('Filtered Data:', filtered);
        console.log('Total Emission:', total);
    };

    const getIndicatorColor = () => {
        let avgEmission = AVERAGE_EMISSION_MONTHLY;
        if (timeFilter === 'weekly') avgEmission = AVERAGE_EMISSION_WEEKLY;

        if (totalEmission < avgEmission * 0.8) return "text-green-600 bg-green-100";
        if (totalEmission < avgEmission * 1.2) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Dashboard Emisi</h2>
                <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white"
                >
                    <option value="all">Semua</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                </select>
            </div>

            <StatsHighlight data={filteredData} timeFilter={timeFilter} previousTotal={previousTotal} />

            <div className={`p-4 rounded-lg shadow-md ${getIndicatorColor()}`}>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                        Total Emisi Anda: {totalEmission.toFixed(2)} kgCO₂
                    </span>
                    <div className="flex items-center">
                        <span className="text-lg font-semibold">
                            Rata-rata (
                            {timeFilter === 'weekly'
                                ? "Mingguan"
                                : timeFilter === 'monthly'
                                    ? "Bulanan"
                                    : "Semua"}
                            ): {timeFilter !== 'all' ? averageEmission.toFixed(2) : '-'} kgCO₂
                        </span>
                        <InformationCircleIcon className="h-5 w-5 ml-2 cursor-pointer" data-tooltip-id="tooltip-global" />
                    </div>
                </div>
            </div>

            <Tooltip id="tooltip-global">
                <span>
                    Perbandingan ini berdasarkan rata-rata emisi karbon global. <br />
                    🌱 <b>Hijau:</b> Emisi Anda lebih rendah dari rata-rata global (bagus!). <br />
                    ⚠️ <b>Kuning:</b> Mendekati batas rata-rata global. <br />
                    🔥 <b>Merah:</b> Emisi tinggi, coba kurangi konsumsi energi.
                </span>
            </Tooltip>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <ComparisonChart currentData={filteredData} previousData={previousTotal} timeFilter={timeFilter} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <CarbonChart data={filteredData} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
                    <h3 className="text-lg font-medium mb-4">Rincian Emisi</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-600 border-b">
                                <th className="pb-3">Kategori</th>
                                <th className="pb-3">Tanggal</th>
                                <th className="pb-3">Emisi (kgCO₂)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.slice(0, visibleCount).map((item, index) => (
                                    <tr key={index} className="border-b last:border-0">
                                        <td className="py-3">{item.category}</td>
                                        <td className="py-3">
                                            {new Date(item.created_at).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="py-3 font-medium">{item.value.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-3 text-gray-500">
                                        Tidak ada data untuk periode ini.
                                    </td>
                                </tr>
                            )}
                            {filteredData.length > visibleCount && (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        <button
                                            onClick={loadMore}
                                            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Selengkapnya
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
