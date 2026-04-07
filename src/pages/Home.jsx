import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function Home() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videos")
        setVideos(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div>
      <h2 style={{marginLeft:"20px"}}>🔥 Trending Videos</h2>

      <div className="video-grid">
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id} className="card">
            
            <img 
              src={video.thumbnail} 
              alt="thumbnail"
              className="thumbnail"
            />

            <div className="video-info">
              <h4>{video.title}</h4>
              <p>{video.views} views</p>
            </div>

          </Link>
        ))}
      </div>
    </div>
  )
}