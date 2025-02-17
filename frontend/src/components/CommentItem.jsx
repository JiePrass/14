/* eslint-disable react/prop-types */
import { useState } from "react";

// Helper function untuk membangun URL gambar profil
function getProfileImageUrl(image) {
    if (!image) return null;
    // Jika image sudah diawali dengan "/" maka tidak perlu menambahkan lagi
    return `http://localhost:2304${image.startsWith("/") ? "" : "/"}${image}`;
}

export default function CommentItem({ comment, replyComment }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        await replyComment(comment.id, replyText);
        setReplyText("");
        setShowReplyForm(false);
    };

    return (
        <div className="mt-2">
            <div className="flex items-start gap-3">
                {/* Avatar komentar */}
                <div className="w-8 h-8 flex-shrink-0">
                    {comment.commenter?.profile_picture ? (
                        <img
                            src={getProfileImageUrl(comment.commenter.profile_picture)}
                            alt={`${comment.commenter.name}'s avatar`}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300 rounded-full" />
                    )}
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">
                        {comment.commenter?.name || "Anon"}
                    </div>
                    <div className="text-sm text-gray-600">{comment.comment}</div>
                    <button
                        onClick={() => setShowReplyForm((prev) => !prev)}
                        className="text-xs text-blue-500 hover:underline mt-1"
                    >
                        Reply
                    </button>
                    {showReplyForm && (
                        <form
                            onSubmit={handleReplySubmit}
                            className="flex items-center gap-2 mt-2"
                        >
                            <input
                                type="text"
                                placeholder="Tulis balasan..."
                                className="flex-1 p-2 border rounded-md text-xs"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
                            >
                                Send
                            </button>
                        </form>
                    )}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
                            {comment.replies.map((reply, index) => (
                                <div key={reply.id || index} className="flex items-start gap-2">
                                    <div className="w-6 h-6 flex-shrink-0">
                                        {reply.commenter?.profile_picture ? (
                                            <img
                                                src={getProfileImageUrl(reply.commenter.profile_picture)}
                                                alt={`${reply.commenter.name}'s avatar`}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300 rounded-full" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-gray-800">
                                            {reply.commenter?.name || "Anon"}
                                        </div>
                                        <div className="text-xs text-gray-600">{reply.comment}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
