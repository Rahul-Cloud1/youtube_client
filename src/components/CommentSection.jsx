import { useEffect, useState } from "react";
import { getComments, addComment, updateComment, deleteComment } from "../api/commentApi";
import { useAuth } from "../context/AuthContext";
import Comment from "./Comment";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { user } = useAuth();

  const fetchComments = async () => {
    try {
      const res = await getComments(videoId);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to comment");

    try {
      await addComment(videoId, { text });
      setText("");
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateComment = async (commentId, data) => {
    try {
      await updateComment(commentId, data);
      fetchComments();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="commentSection">
      <h3>Comments</h3>
      {user && (
        <form onSubmit={handleAddComment}>
          <input
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
      )}

      {comments.map((c) => (
        <Comment
          key={c._id}
          comment={c}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentSection;