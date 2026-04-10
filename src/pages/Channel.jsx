import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannel, getChannelVideos, subscribeChannel } from "../api/channelApi";
import { updateVideo, deleteVideo } from "../api/videoApi";
import VideoCard from "../components/VideoCard";
import EditVideoModal from "../components/EditVideoModal";
import { useAuth } from "../context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const Channel = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchChannelData = async () => {
    try {
      const res = await getChannel(id);
      setChannel(res.data);

      const vidRes = await getChannelVideos(id);
      setVideos(vidRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubscribe = async () => {
    if (!user) return alert("Login required");
    await subscribeChannel(id);
    fetchChannelData();
  };

  const handleEditClick = (video) => {
    setEditingVideo(video);
    setShowEditModal(true);
  };

  const handleDeleteClick = (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      handleDeleteVideo(videoId);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      setLoading(true);
      await deleteVideo(videoId);
      alert("Video deleted successfully!");
      fetchChannelData();
    } catch (err) {
      console.log(err);
      alert("Failed to delete video");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async (videoId, updatedData) => {
    try {
      setLoading(true);
      await updateVideo(videoId, updatedData);
      alert("Video updated successfully!");
      setShowEditModal(false);
      fetchChannelData();
    } catch (err) {
      console.log(err);
      alert("Failed to update video");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, [id]);

  if (!channel) return <h2 className="loadingText">Loading...</h2>;

  const isOwner = user && user.id === channel.owner;

  return (
    <div className="channelPage">
      {/* Channel Header */}
      <div className="channelHeader">
        <div className="channelInfo">
          <h1>{channel.channelName}</h1>
          <p>{channel.subscribers?.length || 0} Subscribers</p>
          <p className="channelDescription">{channel.description || "No description"}</p>
        </div>

        {user && (
          <div className="channelActions">
            {isOwner ? (
              <button className="ownerBtn" disabled>
                ✓ Your Channel
              </button>
            ) : (
              <button className="subscribeBtn" onClick={handleSubscribe}>
                Subscribe
              </button>
            )}
          </div>
        )}
      </div>

      {/* Videos Section */}
      <div className="videosSection">
        <h2>Videos ({videos.length})</h2>

        {videos.length === 0 ? (
          <div className="emptyState">
            <p>No videos yet</p>
          </div>
        ) : isOwner ? (
          // Owner View - with edit/delete options
          <div className="videosList">
            {videos.map((video) => (
              <div key={video._id} className="videoItem">
                <VideoCard video={video} />
                <div className="videoActions">
                  <button
                    className="editBtn"
                    onClick={() => handleEditClick(video)}
                    title="Edit video"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDeleteClick(video._id)}
                    title="Delete video"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Viewer View - just show videos
          <div className="videoGrid">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>

      {/* Edit Video Modal */}
      <EditVideoModal
        isOpen={showEditModal}
        video={editingVideo}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        loading={loading}
      />
    </div>
  );
};

export default Channel;