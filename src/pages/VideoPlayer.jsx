import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideo, addView, likeVideo, dislikeVideo } from "../api/videoApi";
import CommentSection from "../components/CommentSection";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  const getVideo = async () => {
    try {
      const res = await fetchVideo(id);
      console.log("VIDEO:", res.data);
      setVideo(res.data);

      const viewRes = await addView(id);
      console.log("VIEW RESPONSE:", viewRes.data);

    } catch (err) {
      console.log("GET VIDEO ERROR:", err.response?.data || err.message);
    }
  };

  const handleLike = async () => {
    try {
      const res = await likeVideo(id);
      console.log("LIKE RESPONSE:", res.data);
      getVideo();
    } catch (err) {
      console.log("LIKE ERROR:", err.response?.data || err.message);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await dislikeVideo(id);
      console.log("DISLIKE RESPONSE:", res.data);
      getVideo();
    } catch (err) {
      console.log("DISLIKE ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getVideo();
  }, [id]);

  if (!video) return <h2>Loading...</h2>;

  return (
    <div className="videoPage">
      <video src={video.videoUrl} controls width="800" />

      <h2>{video.title}</h2>
      <p>{video.description}</p>

      <div className="videoActions">
        <button onClick={handleLike}>👍 {video.likes}</button>
        <button onClick={handleDislike}>👎 {video.dislikes}</button>
        <span>{video.views} views</span>
      <CommentSection videoId={video._id} />
      </div>
    </div>
  );
};

export default VideoPlayer;