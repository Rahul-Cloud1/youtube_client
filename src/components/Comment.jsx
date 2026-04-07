const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <b>{comment.username}</b> <span>{new Date(comment.createdAt).toLocaleString()}</span>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;