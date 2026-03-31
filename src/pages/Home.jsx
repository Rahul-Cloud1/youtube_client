import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await API.get("/videos");
      setVideos(res.data);
    };
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 Trending Videos</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        {videos.map((video) => (
          <Link
            key={video._id}
            to={`/video/${video._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div style={{ cursor: "pointer" }}>
              <img
                src={video.thumbnail}
                alt="thumbnail"
                width="100%"
                style={{ borderRadius: "10px" }}
              />

              <h3>{video.title}</h3>
              <p>{video.views} views</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;