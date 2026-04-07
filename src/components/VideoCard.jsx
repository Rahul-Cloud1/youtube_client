import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`} className="videoCard">
      <img src={video.thumbnailUrl} alt="thumbnail" />

      <div className="videoInfo">
        <h4>{video.title}</h4>
        <p>{video.channelName}</p>
        <span>{video.views} views</span>
      </div>
    </Link>
  );
};

export default VideoCard;