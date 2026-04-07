import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <Link to="/">Home</Link>
      <Link to="/">Subscriptions</Link>
      <Link to="/">Library</Link>
      <Link to="/">History</Link>
      <Link to="/">Your Videos</Link>
      <Link to="/">Watch Later</Link>
    </div>
  );
};

export default Sidebar;