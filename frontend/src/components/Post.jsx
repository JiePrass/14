/* eslint-disable react/prop-types */
import { useState } from "react";
import { HeartIcon, ChatBubbleLeftIcon, FlagIcon } from "@heroicons/react/24/outline";
import api from "../../services/api";
import CommentItem from "./CommentItem";

export default function Post({ post, toggleLikePost, addComment, reportPost, refreshPosts }) {
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        addComment(post.id, commentText);
        setCommentText("");
    };

    // Fungsi untuk mengirim reply ke API
    const replyComment = async (commentId, replyText) => {
        try {
            await api.post(`/community/${post.id}/comments/${commentId}/reply`, {
                content: replyText,
            });
            refreshPosts();
        } catch (error) {
            console.error("Error replying to comment:", error);
        }
    };

    // Bangun URL foto profil author
    const imgURL = post.author?.profile_picture
        ? `http://localhost:2304${post.author.profile_picture.startsWith('/') ? '' : '/'}${post.author.profile_picture}`
        : null;

    // Hitung total likes berdasarkan panjang array `community_likes`
    const totalLikes = post.community_likes ? post.community_likes.length : 0;

    // Periksa apakah user sudah like post ini
    const loggedInUserId = parseInt(localStorage.getItem("user_id"), 10);
    const isLikedByUser = post.community_likes?.some((like) => like.user.id === loggedInUserId);

    return (
        <div className="bg-white p-4 md:p-6 rounded-md shadow-md space-y-3">
            {/* Header Post */}
            <div className="flex gap-3">
                <div className="w-12 h-12 flex-shrink-0">
                    {imgURL ? (
                        <img
                            src={imgURL}
                            alt={`${post.author.name}'s avatar`}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300 rounded-full" />
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-medium text-gray-800">
                        {post.author?.name}
                    </h2>
                    <h3 className="text-base md:text-lg">{post.topic}</h3>
                </div>
            </div>

            {/* Konten Post */}
            {post.content && (
                <p className="text-gray-600 text-sm">{post.content}</p>
            )}

            {/* Tombol Interaksi */}
            <div className="flex items-center justify-between mt-2 text-xs md:text-sm">
                <button
                    className={`flex items-center ${isLikedByUser ? 'text-red-500' : 'text-gray-600'
                        } hover:text-red-500 transition`}
                    onClick={() => toggleLikePost(post.id)}
                >
                    <HeartIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                    {totalLikes} Suka
                </button>

                <button
                    className="flex items-center text-gray-600 hover:text-blue-500 transition"
                    onClick={() => setShowComments(!showComments)}
                >
                    <ChatBubbleLeftIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                    {post.comments?.length || 0} Komentar
                </button>
                <button
                    className="flex items-center text-gray-600 hover:text-red-500 transition"
                    onClick={() => reportPost(post.id)}
                >
                    <FlagIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                    Laporkan
                </button>
            </div>

            {/* Form & Daftar Komentar */}
            {showComments && (
                <div className="mt-3 space-y-3">
                    <form onSubmit={handleCommentSubmit} className="flex flex-col md:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Tulis komentar..."
                            className="flex-1 p-2 border rounded-md text-xs md:text-sm"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white text-xs md:text-sm rounded-md hover:bg-blue-600 transition"
                        >
                            Kirim
                        </button>
                    </form>
                    <div className="space-y-3">
                        {post.comments?.map((comment, index) => (
                            <CommentItem
                                key={comment.id || index}
                                comment={comment}
                                replyComment={replyComment}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
