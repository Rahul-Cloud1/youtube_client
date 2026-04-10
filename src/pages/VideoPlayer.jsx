import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideo, addView, likeVideo, dislikeVideo, fetchVideos } from "../api/videoApi";
import CommentSection from "../components/CommentSection";
import VideoCard from "../components/VideoCard";
import { FaThumbsUp, FaThumbsDown, FaShare, FaDownload } from "react-icons/fa";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const getVideo = async () => {
    try {
      const res = await fetchVideo(id);
      console.log("VIDEO:", res.data);
      setVideo(res.data);

      const viewRes = await addView(id);
      console.log("VIEW RESPONSE:", viewRes.data);

      // Fetch related videos
      const relatedRes = await fetchVideos({ category: res.data.category });
      const videoList = relatedRes.data.videos || relatedRes.data;
      setRelatedVideos(videoList.filter(v => v._id !== id).slice(0, 8));
    } catch (err) {
      console.log("GET VIDEO ERROR:", err.response?.data || err.message);
    }
  };

  const handleLike = async () => {
    try {
      await likeVideo(id);
      setLiked(!liked);
      setDisliked(false);
      getVideo();
    } catch (err) {
      console.log("LIKE ERROR:", err.response?.data || err.message);
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeVideo(id);
      setDisliked(!disliked);
      setLiked(false);
      getVideo();
    } catch (err) {
      console.log("DISLIKE ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getVideo();
  }, [id]);

  if (!video) return <h2 className="loadingText">Loading...</h2>;

  return (
    <div className="videoPlayerPage">
      <div className="mainContent">
        {/* VIDEO PLAYER */}
        <div className="videoPlayerContainer">
          <video
            width="100%"
            height="100%"
            controls
            src={video.videoUrl}
            className="videoPlayer"
          />
        </div>

        {/* VIDEO INFO */}
        <div className="videoInfo">
          <h1>{video.title}</h1>
          
          <div className="videoMeta">
            <div className="channelInfo">
              <div className="channelAvatar"></div>
              <div>
                <h3>{video.channelName}</h3>
                <p>Uploaded on {new Date(video.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button className="subscribeBtn">Subscribe</button>
          </div>

          <div className="videoDescription">
            <p>{video.description}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="videoActionBar">
          <button 
            className={`actionBtn ${liked ? "active" : ""}`}
            onClick={handleLike}
          >
            <FaThumbsUp /> <span>{video.likes}</span>
          </button>
          <button 
            className={`actionBtn ${disliked ? "active" : ""}`}
            onClick={handleDislike}
          >
            <FaThumbsDown /> <span>{video.dislikes}</span>
          </button>
          <button className="actionBtn">
            <FaShare /> <span>Share</span>
          </button>
          <button className="actionBtn">
            <FaDownload /> <span>Download</span>
          </button>
        </div>

        <div className="divider"></div>

        {/* COMMENTS */}
        <CommentSection videoId={video._id} />
      </div>

      {/* SIDEBAR - RELATED VIDEOS */}
      <div className="sidebarVideos">
        <h3>Related Videos</h3>
        {relatedVideos.map(v => (
          <div key={v._id} className="sidebarVideoCard">
            <VideoCard video={v} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;