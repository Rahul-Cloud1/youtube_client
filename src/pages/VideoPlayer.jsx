import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideo, addView, likeVideo, dislikeVideo } from "../api/videoApi";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  const getVideo = async () => {
    try {
      const res = await fetchVideo(id);
      setVideo(res.data);
      await addView(id); // increase views automatically
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVideo();
  }, [id]);

  const handleLike = async () => {
    await likeVideo(id);
    getVideo();
  };

  const handleDislike = async () => {
    await dislikeVideo(id);
    getVideo();
  };

  if (!video) return <h2>Loading...</h2>;

  return (
    <div className="videoPage">
      <video
        src={video.videoUrl}
        controls
        width="800"
      />

      <h2>{video.title}</h2>
      <p>{video.description}</p>

      <div className="videoActions">
        <button onClick={handleLike}>👍 {video.likes}</button>
        <button onClick={handleDislike}>👎 {video.dislikes}</button>
        <span>{video.views} views</span>
      </div>
    </div>
  );
};

export default VideoPlayer;