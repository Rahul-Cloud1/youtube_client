import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/home"><p>Home</p></Link>
      <p>Subscriptions</p>
      <p>Library</p>
      <p>History</p>
      <p>Your Videos</p>
      <p>Watch Later</p>
    </div>
  );
};

export default Sidebar;