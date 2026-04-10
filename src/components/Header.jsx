import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import SignInModal from "./SignInModal";
import youtubeLogo from "../assets/youtube logo.png";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSearch = () => {
    navigate(`/?search=${query}`);
  };

  return (
    <div className="header">
      <FaBars className="icon" onClick={toggleSidebar} />

      <Link to="/" className="logo">
        <img src={youtubeLogo} alt="YouTube Logo" className="logoImage" />
      </Link>

      <div className="searchBox">
        <input
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaSearch onClick={handleSearch} style={{ cursor: "pointer" }} />
      </div>

{user ? (
  <div className="headerRight">
    <Link to="/upload">
      <button className="uploadBtn">Upload</button>
    </Link>
    <ProfileDropdown />
  </div>
) : (
  <>
    <button className="loginBtn" onClick={() => setShowSignIn(true)}>
      <FaUserCircle /> Sign In
    </button>
    <Link to="/upload">
      <button className="uploadBtn">Upload</button>
    </Link>
  </>
)}

      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </div>
  );
};

export default Header;