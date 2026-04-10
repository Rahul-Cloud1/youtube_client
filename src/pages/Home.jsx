import { useEffect, useState } from "react";
import { fetchVideos } from "../api/videoApi";
import VideoCard from "../components/VideoCard";
import FilterButtons from "../components/FilterButtons";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("All");

  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get("search");

  const getVideos = async () => {
    try {
      const res = await fetchVideos({
        category: category === "All" ? "" : category,
        search: searchQuery || ""
      });
      // Extract videos array from new response format
      setVideos(res.data.videos || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FIXED HERE
  useEffect(() => {
    getVideos();
  }, [category, searchQuery]);

  return (
    <div>
      <FilterButtons setCategory={setCategory} />
    

      <div className="videoGrid">
  {videos.map(video => (
    <VideoCard key={video._id} video={video} />
  ))}
</div>
    </div>
  );
};

export default Home;