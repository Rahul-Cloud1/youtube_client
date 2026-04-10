import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { updateUserProfile } from "../api/authApi";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  if (!user) return null;

  return (
    <div className="profilePage">
      <div className="profileContainer">
        {/* Profile Header */}
        <div className="profileHeader">
          <div className="profilePhotoSection">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt="profile" className="profilePhoto" />
            ) : (
              <div className="profilePhotoPlaceholder">
                <FaUserCircle />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="profileInfo">
            {!isEditing ? (
              <>
                <div className="infoItem">
                  <label>Name</label>
                  <p>{formData.name || "Not set"}</p>
                </div>
                <div className="infoItem">
                  <label>Username</label>
                  <p>@{formData.username}</p>
                </div>
                <div className="infoItem">
                  <label>Email</label>
                  <p>{formData.email}</p>
                </div>

                <div className="profileActions">
                  <button className="editBtn" onClick={() => setIsEditing(true)}>
                    <FaEdit /> Edit Profile
                  </button>
                  <button className="logoutBtn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="editForm">
                  <div className="formGroup">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="formGroup">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Your username"
                      disabled
                    />
                    <small>Username cannot be changed</small>
                  </div>

                  <div className="formGroup">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      disabled
                    />
                    <small>Email cannot be changed</small>
                  </div>

                  <div className="editActions">
                    <button className="saveBtn" onClick={handleSave}>
                      <FaSave /> Save Changes
                    </button>
                    <button className="cancelBtn" onClick={() => setIsEditing(false)}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Account Details Section */}
        <div className="accountSection">
          <h3>Account Details</h3>

          <div className="detailsGrid">
            <div className="detailCard">
              <h4>Member Since</h4>
              <p>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>

            <div className="detailCard">
              <h4>Account Status</h4>
              <p className="status active">Active</p>
            </div>

            <div className="detailCard">
              <h4>User ID</h4>
              <p className="userId">{user._id}</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quickLinks">
          <a href="/home" className="link">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
