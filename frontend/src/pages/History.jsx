/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import HistoryChart from '../components/Charts/HistoryChart';
import HistoryTable from '../components/HistoryTable';
import HistoryDistribution from '../components/HistoryDistribution';
import CarbonChart from '../components/Charts/CarbonChart';
import TrendComparison from '../components/TrendComparison';

const History = ({ emissionData = {} }) => {
    // Ekstrak array emissions dari response API.
    const emissions = Array.isArray(emissionData.emissions)
        ? emissionData.emissions
        : [];

    const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        console.log("Year Filter Updated:", yearFilter);
        filterData();
    }, [yearFilter, emissions]);

    const filterData = () => {
        // Filter data berdasarkan tahun dari properti created_at
        const filtered = emissions.filter((item) => {
            if (!item.created_at) return false;
            const itemYear = new Date(item.created_at).getFullYear();
            return itemYear === yearFilter;
        });
        setFilteredData(filtered);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Riwayat Aktivitas</h2>
                <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(parseInt(e.target.value))}
                    className="px-4 py-2 border rounded-lg bg-white"
                >
                    {[...Array(4)].map((_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm overflow-y-hidden overflow-x-auto">
                <HistoryChart data={filteredData} yearFilter={yearFilter} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <CarbonChart data={filteredData} yearFilter={yearFilter} />
                </div>
                <div className="grid md:grid-rows-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <HistoryDistribution data={filteredData} />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <TrendComparison
                            data={filteredData}
                            yearFilter={yearFilter}
                            emissionData={emissions}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <HistoryTable data={filteredData} />
            </div>
        </div>
    );
};

export default History;
