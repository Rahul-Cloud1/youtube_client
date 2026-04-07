import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    navigate(`/?search=${query}`);
  };

  return (
    <div className="header">
      <FaBars className="icon" onClick={toggleSidebar} />

      <Link to="/" className="logo">YouTube Clone</Link>

      <div className="searchBox">
        <input
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaSearch onClick={handleSearch} style={{ cursor: "pointer" }} />
      </div>

      {user ? (
        <div className="user">{user.name}</div>
      ) : (
        <Link to="/login">
          <button className="loginBtn">
            <FaUserCircle /> Sign In
          </button>
        </Link>
      )}
    </div>
  );
};

export default Header;