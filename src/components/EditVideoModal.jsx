import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EditVideoModal = ({ isOpen, video, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    category: video?.category || "Music",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Title and description are required");
      return;
    }
    onSave(video._id, formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="closeBtn" onClick={onClose}>
          <FaTimes />
        </button>

        <h2>Edit Video</h2>

        <form onSubmit={handleSubmit} className="editVideoForm">
          {/* Title */}
          <div className="formGroup">
            <label>Video Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter video title"
              maxLength={100}
              required
            />
            <small>{formData.title.length}/100</small>
          </div>

          {/* Description */}
          <div className="formGroup">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter video description"
              rows={5}
              maxLength={500}
              required
            />
            <small>{formData.description.length}/500</small>
          </div>

          {/* Category */}
          <div className="formGroup">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option>Music</option>
              <option>Gaming</option>
              <option>News</option>
              <option>Sports</option>
              <option>Learning</option>
              <option>Podcasts</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="formActions">
            <button type="submit" className="saveBtn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" className="cancelBtn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideoModal;
