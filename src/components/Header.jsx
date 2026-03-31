import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      background: "#fff",
      borderBottom: "1px solid #ccc"
    }}>
      <h2>YouTube</h2>

      <input placeholder="Search..." style={{ width: "40%" }} />

      <Link to="/login">Sign In</Link>
    </div>
  );
};

export default Header;