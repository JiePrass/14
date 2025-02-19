import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TransportForm from "../components/Form/TransportForm";
import Electricity from "../components/Form/Electricity";
import FoodForm from "../components/Form/FoodForm";
import OtherActivity from "../components/Form/OtherActivity";
import api from "../../services/api";

export default function CarbonCalculator() {
    // State untuk data input tiap kategori
    const [transportData, setTransportData] = useState({
        vehicleType: "",
        distance: "",
    });
    const [electricityData, setElectricityData] = useState({
        va: "",
        usage: "", // dalam kWh
    });
    const [foodData, setFoodData] = useState({
        foodType: "",
        consumption: "", // dalam kg
    });
    const [otherData, setOtherData] = useState({
        activity: "",
        duration: "",   // misalnya jam per kegiatan
        frequency: "",  // misalnya frekuensi kegiatan (berapa kali)
    });

    // State untuk hasil perhitungan emisi (kg CO₂)
    const [emissions, setEmissions] = useState({
        transportation: 0,
        electricity: 0,
        food: 0,
        other: 0,
    });

    const navigate = useNavigate();

    // Perhitungan emisi real-time ketika data input berubah
    useEffect(() => {
        // --- Transportasi ---
        // Faktor emisi dalam kg CO₂ per km
        const transportEmissionFactors = {
            "Mobil": 0.192,
            "Mobil Listrik": 0.127,
            "Motor": 0.068,
            "Motor Listrik": 0.025,
            "Bus": 0.105,
            "Kereta Api": 0.41
        };
        let transportationEmission = 0;
        if (
            transportData.vehicleType &&
            transportData.distance !== "" &&
            !isNaN(transportData.distance) &&
            Number(transportData.distance) >= 0
        ) {
            transportationEmission =
                Number(transportData.distance) *
                (transportEmissionFactors[transportData.vehicleType] || 0);
        }

        // --- Listrik ---
        // Faktor emisi listrik: 0.85 kg CO₂ per kWh
        let electricityEmission = 0;
        if (
            electricityData.usage !== "" &&
            !isNaN(electricityData.usage) &&
            Number(electricityData.usage) >= 0
        ) {
            electricityEmission = Number(electricityData.usage) * 0.85;
        }

        // --- Makanan ---
        // Faktor emisi makanan dalam kg CO₂ per kg makanan
        const foodEmissionFactors = {
            "Daging Sapi": 99.48,
            "Daging Ayam": 12,
            "Keju": 21,
            "Tahu": 2,
            "Kacang": 0.9,
            "Sayuran": 2,  // contoh, sesuaikan dengan data yang diinginkan
            "Buah": 3,     // contoh, sesuaikan dengan data yang diinginkan
        };
        let foodEmission = 0;
        if (
            foodData.foodType &&
            foodData.consumption !== "" &&
            !isNaN(foodData.consumption) &&
            Number(foodData.consumption) >= 0
        ) {
            foodEmission =
                Number(foodData.consumption) *
                (foodEmissionFactors[foodData.foodType] || 0);
        }

        // --- Aktivitas Lainnya ---
        // Faktor emisi untuk aktivitas lainnya (kg CO₂ per unit)
        const otherActivityEmissionMapping = {
            "Belanja Online": 0.5,
            "Penggunaan Gadget": 0.3,
            Rekreasi: 0.7,
            "Bekerja dari Rumah": 0.4,
        };
        let otherEmission = 0;
        if (
            otherData.activity &&
            otherData.duration !== "" &&
            !isNaN(otherData.duration) &&
            Number(otherData.duration) >= 0 &&
            otherData.frequency !== "" &&
            !isNaN(otherData.frequency) &&
            Number(otherData.frequency) >= 0
        ) {
            const baseEmission = otherActivityEmissionMapping[otherData.activity] || 0;
            otherEmission =
                baseEmission * Number(otherData.duration) * Number(otherData.frequency);
        }

        setEmissions({
            transportation: transportationEmission,
            electricity: electricityEmission,
            food: foodEmission,
            other: otherEmission,
        });
    }, [transportData, electricityData, foodData, otherData]);

    // Hitung total emisi
    const totalEmission = Object.values(emissions).reduce(
        (acc, val) => acc + Number(val),
        0
    );

    // Handler submit untuk mengirim data ke API
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Siapkan payload untuk tiap kategori jika nilainya lebih dari 0
        const categoriesToSubmit = [];
        if (emissions.transportation > 0)
            categoriesToSubmit.push({
                category: "Transportasi",
                value: emissions.transportation,
            });
        if (emissions.electricity > 0)
            categoriesToSubmit.push({
                category: "Listrik",
                value: emissions.electricity,
            });
        if (emissions.food > 0)
            categoriesToSubmit.push({
                category: "Makanan",
                value: emissions.food,
            });
        if (emissions.other > 0)
            categoriesToSubmit.push({
                category: "Lainnya",
                value: emissions.other,
            });

        try {
            // Mengirim semua kategori emisi secara paralel
            const responses = await Promise.all(
                categoriesToSubmit.map((item) => api.post("/kalkulator", item))
            );
            const missionMessage =
                responses[0].data.message || "Data emisi berhasil disimpan!";
            Swal.fire({
                title: "Berhasil!",
                text: missionMessage,
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/dashboard");
            });
        } catch (error) {
            console.error("Error saving emission data:", error);
            Swal.fire({
                title: "Gagal!",
                text: "Gagal menyimpan data emisi.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Kalkulator Emisi CO₂
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <TransportForm data={transportData} setData={setTransportData} />
                        <Electricity data={electricityData} setData={setElectricityData} />
                        <FoodForm data={foodData} setData={setFoodData} />
                        <OtherActivity data={otherData} setData={setOtherData} />
                    </div>
                    <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Ringkasan Total Emisi
                        </h2>
                        <p className="text-xl text-gray-700">
                            Total Emisi:{" "}
                            <span className="font-semibold">{totalEmission.toFixed(2)}</span> kg CO₂
                        </p>
                        <div className="mt-4 space-y-1">
                            <p className="text-gray-700">
                                Transportasi:{" "}
                                <span className="font-semibold">
                                    {emissions.transportation.toFixed(2)}
                                </span>{" "}
                                kg CO₂
                            </p>
                            <p className="text-gray-700">
                                Listrik:{" "}
                                <span className="font-semibold">
                                    {emissions.electricity.toFixed(2)}
                                </span>{" "}
                                kg CO₂
                            </p>
                            <p className="text-gray-700">
                                Makanan:{" "}
                                <span className="font-semibold">
                                    {emissions.food.toFixed(2)}
                                </span>{" "}
                                kg CO₂
                            </p>
                            <p className="text-gray-700">
                                Aktivitas Lainnya:{" "}
                                <span className="font-semibold">
                                    {emissions.other.toFixed(2)}
                                </span>{" "}
                                kg CO₂
                            </p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Simpan Data Emisi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
