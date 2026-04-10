import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="profileDropdown" ref={dropdownRef}>
      <button
        className="profileBtn"
        onClick={() => setIsOpen(!isOpen)}
        title="Profile"
      >
        {user.profilePhoto ? (
          <img src={user.profilePhoto} alt="profile" className="profileImage" />
        ) : (
          <FaUserCircle className="profileIcon" />
        )}
        <FaChevronDown className="chevron" style={{ fontSize: "12px" }} />
      </button>

      {isOpen && (
        <div className="profileMenu">
          <div className="profileHeader">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt="profile" className="profilePhoto" />
            ) : (
              <div className="profilePhotoPlaceholder">
                <FaUserCircle />
              </div>
            )}
          </div>

          <div className="profileInfo">
            <div className="infoItem">
              <span className="label">Username</span>
              <span className="value">{user.username}</span>
            </div>
            <div className="infoItem">
              <span className="label">Email</span>
              <span className="value">{user.email}</span>
            </div>
            {user.name && (
              <div className="infoItem">
                <span className="label">Name</span>
                <span className="value">{user.name}</span>
              </div>
            )}
          </div>

          <div className="profileActions">
            <button className="viewProfileBtn" onClick={handleNavigateToProfile}>
              View Profile
            </button>
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
