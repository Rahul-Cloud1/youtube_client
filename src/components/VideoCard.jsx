import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  // Handle both full URLs and relative paths
  const getThumbnailUrl = () => {
    if (!video.thumbnailUrl) return "https://via.placeholder.com/280x180?text=No+Image";
    if (video.thumbnailUrl.startsWith("http")) return video.thumbnailUrl;
    return `http://localhost:5000/${video.thumbnailUrl}`;
  };

  return (
    <Link to={`/video/${video._id}`} className="videoCard">
      
      <img 
        src={getThumbnailUrl()} 
        alt="thumbnail" 
        className="thumbnail"
      />

      <div className="videoInfo">
        <div className="avatar"></div>

        <div className="videoText">
          <h4>{video.title}</h4>
          <p className="channelName">My Channel</p>
          <p className="views">{video.views} views</p>
        </div>
      </div>

    </Link>
  );
};

export default VideoCard;