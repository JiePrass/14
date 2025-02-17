import { useState, useEffect } from "react";
import Post from "../components/Post";
import CreatePostForm from "../components/Form/CreatePostForm";
import Swal from "sweetalert2";
import api from "../../services/api";

export default function CommunityPage() {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const response = await api.get("/community");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Fungsi untuk toggle like
    const toggleLikePost = async (postId) => {
        // Pastikan postId berupa string untuk perbandingan
        const targetPostId = postId.toString();

        // Cari post terkait dengan membandingkan ID dalam bentuk string
        const post = posts.find((p) => p.id.toString() === targetPostId);
        if (!post) return;

        // Ambil user_id dari localStorage
        const loggedInUserId = parseInt(localStorage.getItem("user_id"));
        if (isNaN(loggedInUserId)) {
            console.error("User ID tidak ditemukan di localStorage");
            return;
        }

        // Pastikan community_likes berupa array
        const likes = post.community_likes || [];
        // Cek apakah user sudah pernah like post ini
        const existingLike = likes.find(
            (like) => like.user && like.user.id === loggedInUserId
        );

        if (existingLike) {
            // Jika sudah like, lakukan unlike
            const likeId = existingLike.id;
            if (!likeId) {
                console.error("Like id tidak ditemukan, tidak dapat melakukan unlike");
                return;
            }
            try {
                await api.delete(`/community/${postId}/like/${likeId}`);
                // Update state: hapus like dan perbarui jumlah like
                setPosts((prevPosts) =>
                    prevPosts.map((p) => {
                        if (p.id.toString() === targetPostId) {
                            const newLikes = (p.community_likes || []).filter(
                                (like) => like.id !== likeId
                            );
                            return { ...p, community_likes: newLikes, like_count: newLikes.length };
                        }
                        return p;
                    })
                );
            } catch (error) {
                console.error("Error unliking post:", error);
            }
        } else {
            // Jika belum like, lakukan like
            try {
                const response = await api.post(`/community/${postId}/like`);
                console.log("API like response:", response.data);

                // Buat objek like baru menggunakan data dari API
                const newLike = {
                    ...response.data.data,
                    user: {
                        id: loggedInUserId,
                        name: localStorage.getItem("username") || "User",
                        profile_picture: localStorage.getItem("profile_picture") || "",
                    },
                };

                if (!newLike.id) {
                    console.error("Objek like baru tidak memiliki id:", newLike);
                    return;
                }

                // Update state: tambahkan like baru dan perbarui jumlah like
                setPosts((prevPosts) =>
                    prevPosts.map((p) => {
                        if (p.id.toString() === targetPostId) {
                            const newLikes = [...(p.community_likes || []), newLike];
                            return { ...p, community_likes: newLikes, like_count: newLikes.length };
                        }
                        return p;
                    })
                );
            } catch (error) {
                console.error("Error liking post:", error);
            }
        }
    };


    const addComment = async (postId, commentText) => {
        const user_id = parseInt(localStorage.getItem("user_id"), 10);
        const username = localStorage.getItem("username") || "User";
        const profile_picture = localStorage.getItem("profile_picture") || "";

        // Create a temporary comment object matching the API response structure
        const tempComment = {
            id: `temp-${Date.now()}`, // Temporary ID for optimistic update
            user_id,
            post_id: postId,
            parent_id: null, // Assuming this is a top-level comment
            comment: commentText, // Field name matches API response
            commenter: { // Structure matches API response
                id: user_id,
                name: username,
                profile_picture: profile_picture,
            },
            replies: [], // Initialize replies as an empty array
        };

        // Optimistically update the UI
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [...(post.comments || []), tempComment], // Add the temporary comment
                    }
                    : post
            )
        );

        try {
            // Kirim request ke API
            await api.post(`/community/${postId}/comments`, {
                content: commentText,
            });

            // Fetch ulang data agar data terbaru dari server langsung ditampilkan
            fetchPosts();
        } catch (error) {
            console.error("Error adding comment:", error);

            // Rollback jika gagal (hapus komentar sementara)
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? {
                            ...post,
                            comments: post.comments.filter((comment) => comment.id !== tempComment.id),
                        }
                        : post
                )
            );
        }


    };

    const reportPost = async (postId) => {
        Swal.fire({
            icon: "success",
            title: "Laporan Dikirim!",
            text: `Post dengan ID ${postId} telah dilaporkan.`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        });
    };

    const addPost = async (newPost) => {
        try {
            await api.post("/community", newPost);
            fetchPosts();
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Community</h1>
            <CreatePostForm addPost={addPost} />
            <div className="transition-opacity duration-300 opacity-100 mt-4 space-y-4">
                {posts.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">Belum ada post.</p>
                ) : (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            toggleLikePost={toggleLikePost}
                            addComment={addComment}
                            reportPost={reportPost}
                            refreshPosts={fetchPosts}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
