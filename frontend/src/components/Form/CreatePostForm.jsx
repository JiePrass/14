/* eslint-disable react/prop-types */
import { useState } from "react";

export default function CreatePostForm({ addPost }) {
    const [topic, setTopic] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic.trim()) {
            alert("Topic harus diisi!");
            return;
        }

        // Buat objek post baru hanya dengan field topic
        const newPost = {
            topic: topic.trim(),
        };

        try {
            await addPost(newPost);
        } catch (error) {
            console.error("Error adding post:", error);
        }
        setTopic("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-md shadow-md space-y-4"
        >
            <h2 className="text-lg font-semibold">Buat Post Baru</h2>

            <input
                type="text"
                placeholder="Masukkan topic post"
                className="w-full p-2 border rounded-md"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
                Posting
            </button>
        </form>
    );
}
