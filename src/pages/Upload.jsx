import { useState } from "react";
import { createVideo } from "../api/videoApi";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "Music",
    channelName: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVideo(form);
      alert("Video uploaded!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="uploadPage">
      <h2>Upload Video</h2>

      <form onSubmit={handleSubmit} className="uploadForm">
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="thumbnailUrl" placeholder="Thumbnail URL" onChange={handleChange} required />
        <input name="videoUrl" placeholder="Video URL" onChange={handleChange} required />
        <input name="channelName" placeholder="Channel Name" onChange={handleChange} required />

        <select name="category" onChange={handleChange}>
          <option>Music</option>
          <option>Gaming</option>
          <option>News</option>
          <option>Sports</option>
          <option>Learning</option>
          <option>Podcasts</option>
        </select>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;