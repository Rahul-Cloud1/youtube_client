import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaThumbsUp, FaThumbsDown, FaEllipsisV } from "react-icons/fa";

const Comment = ({ comment, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const isOwner = user && user.id === comment.userId;

  const handleUpdate = async () => {
    if (!editText.trim()) return;
    setLoading(true);
    try {
      await onUpdate(comment._id, { text: editText });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this comment?")) {
      setLoading(true);
      try {
        await onDelete(comment._id);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diff = now - commentDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    if (days < 7) return days === 1 ? "1 day ago" : `${days} days ago`;
    if (weeks < 4) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;
    return years === 1 ? "1 year ago" : `${years} years ago`;
  };

  return (
    <div className="comment">
      <div className="commentAvatar">
        <div className="avatarPlaceholder">{comment.username?.charAt(0).toUpperCase()}</div>
      </div>
      
      <div className="commentContent">
        <div className="commentHeader">
          <span className="commentAuthor">@{comment.username}</span>
          <span className="commentTime">{getTimeAgo(comment.createdAt)}</span>
          {isOwner && (
            <button className="moreBtn">
              <FaEllipsisV />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="commentEdit">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              disabled={loading}
            />
            <div className="editActions">
              <button onClick={handleUpdate} disabled={loading}>Save</button>
              <button onClick={() => setIsEditing(false)} disabled={loading}>Cancel</button>
            </div>
          </div>
        ) : (
          <p className="commentText">{comment.text}</p>
        )}

        <div className="commentActions">
          <button className="likeBtn">
            <FaThumbsUp /> <span>0</span>
          </button>
          <button className="dislikeBtn">
            <FaThumbsDown /> <span>0</span>
          </button>
          <button className="replyBtn">Reply</button>
          {isOwner && !isEditing && (
            <>
              <button onClick={() => setIsEditing(true)} disabled={loading}>Edit</button>
              <button onClick={handleDelete} disabled={loading}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;