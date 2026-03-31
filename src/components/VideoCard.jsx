import { Link } from "react-router-dom";

const VideoCard = () => {
  return (
    <Link to="/video/1" style={{ textDecoration: "none", color: "black" }}>
      <div>
        <img
          src="https://via.placeholder.com/300x180"
          alt="thumbnail"
          style={{ width: "100%" }}
        />
        <h4>Video Title</h4>
        <p>Channel Name</p>
        <p>1M views</p>
      </div>
    </Link>
  );
};

export default VideoCard;