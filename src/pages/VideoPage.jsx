import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  getComments,
  addComment,
  deleteComment
} from "../api/commentApi";

const VideoPage = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // fetch video
  useEffect(() => {
    const fetchVideo = async () => {
      const res = await API.get(`/videos/${id}`);
      setVideo(res.data);
      await API.put(`/videos/view/${id}`);
    };

    fetchVideo();
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    const res = await getComments(id);
    setComments(res.data);
  };

  // add comment
  const handleComment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return alert("Login first");

    await addComment({
      videoId: id,
      userId: user._id,
      text
    });

    setText("");
    fetchComments();
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    fetchComments();
  };

  if (!video) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <video width="800" controls src={video.videoUrl} />

      <h1>{video.title}</h1>
      <p>{video.description}</p>

      <hr />

      <h2>💬 Comments</h2>

      <input
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleComment}>Post</button>

      {comments.map((c) => (
        <div key={c._id}>
          <p>{c.text}</p>
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default VideoPage;