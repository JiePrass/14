/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import api from "../../services/api";

function ProfilePicture({ profilePicture, size = "medium" }) {
    const sizeClasses = {
        large: "w-24 h-24 md:w-28 md:h-28",
        medium: "w-16 h-16 md:w-20 md:h-20",
        small: "w-10 h-10 md:w-12 md:h-12",
    };

    return profilePicture ? (
        <img src={`http://localhost:2304${profilePicture}`} alt="Profile" className={`${sizeClasses[size]} rounded-full object-cover shadow-md`} />
    ) : (
        <div className={`${sizeClasses[size]} bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-sm shadow-md`}>
            ?
        </div>
    );
}

function TopThreeCard({ rank, user }) {
    const rankStyles = [
        "bg-yellow-400 text-black shadow-xl", // Rank 1
        "bg-gray-300 text-gray-900 shadow-lg", // Rank 2
        "bg-orange-400 text-gray-900 shadow-md", // Rank 3
    ];

    console.log(user)

    return (
        <div className={`flex flex-col items-center p-6 rounded-lg ${rankStyles[rank - 1]} w-1/3`}>
            <span className="text-xl font-bold">#{rank}</span>
            <ProfilePicture profilePicture={user.profile_picture} size="large" />
            <span className="text-lg font-semibold mt-2">{user.name}</span>
            <span className="text-md font-medium">{user.point} pts</span>
        </div>
    );
}

function LeaderboardRow({ rank, user }) {
    return (
        <tr className="border-b hover:bg-gray-50 transition">
            <td className="px-4 py-2 text-center text-gray-700 font-semibold">{rank}</td>
            <td className="px-4 py-2 flex items-center gap-3">
                <ProfilePicture profilePicture={user.profile_picture} size="small" />
                <span className="text-gray-800 font-medium text-lg">{user.name}</span>
            </td>
            <td className="px-4 py-2 text-gray-700 font-semibold text-center">{user.point}</td>
        </tr>
    );
}

export default function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await api.get("/leaderboard");
                setLeaderboardData(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };
        fetchLeaderboard();
    }, []);

    if (!leaderboardData.length) {
        return <div className="text-center py-8">Loading leaderboard...</div>;
    }

    const sortedData = [...leaderboardData].sort((a, b) => b.point - a.point);
    const topThree = sortedData.slice(0, 3);
    const restLeaderboard = sortedData.slice(3, 20);

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h1>
            <div className="flex justify-center gap-4 mb-8">
                {topThree.map((user, index) => (
                    <TopThreeCard key={user.id} rank={index + 1} user={user} />
                ))}
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-gray-600 font-medium text-center">Rank</th>
                        <th className="px-4 py-2 text-gray-600 font-medium">Name</th>
                        <th className="px-4 py-2 text-gray-600 font-medium text-center">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {restLeaderboard.map((user, index) => (
                        <LeaderboardRow key={user.id} rank={index + 4} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
