/* eslint-disable react/prop-types */
import { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const categoryColors = {
    Transportasi: "bg-blue-100 text-blue-700",
    Listrik: "bg-yellow-100 text-yellow-700",
    Makanan: "bg-green-100 text-green-700",
    Pakaian: "bg-red-100 text-red-700",
    Lainnya: "bg-gray-100 text-gray-700",
};

const HistoryTable = ({ data }) => {
    // Gunakan "created_at" untuk sorting tanggal
    const [sortBy, setSortBy] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("desc"); // 'asc' atau 'desc'

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortBy === "created_at") {
            return sortOrder === "asc"
                ? new Date(a.created_at) - new Date(b.created_at)
                : new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortBy === "category") {
            return sortOrder === "asc"
                ? a.category.localeCompare(b.category)
                : b.category.localeCompare(a.category);
        }
        if (sortBy === "value") {
            return sortOrder === "asc" ? a.value - b.value : b.value - a.value;
        }
        return 0;
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Riwayat Aktivitas</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm">
                            {["category", "created_at", "value"].map((key, index) => (
                                <th
                                    key={index}
                                    className="py-3 px-4 text-left cursor-pointer transition-all hover:bg-gray-200"
                                    onClick={() => handleSort(key)}
                                >
                                    {key === "category" && "Kategori"}
                                    {key === "created_at" && "Tanggal"}
                                    {key === "value" && "Emisi (kgCO₂)"}
                                    {sortBy === key && (
                                        <motion.span
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: sortOrder === "asc" ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="inline-block ml-1"
                                        >
                                            {sortOrder === "asc" ? (
                                                <ArrowUpIcon className="h-4 w-4 inline text-gray-700" />
                                            ) : (
                                                <ArrowDownIcon className="h-4 w-4 inline text-gray-700" />
                                            )}
                                        </motion.span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {sortedData.length > 0 ? (
                                sortedData.map((item, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[item.category] || "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            {new Date(item.created_at).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="py-3 px-4 text-right font-semibold text-gray-800">
                                            {item.value.toFixed(2)}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <td colSpan="3" className="text-center py-4 text-gray-500">
                                        Tidak ada data untuk periode ini.
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
