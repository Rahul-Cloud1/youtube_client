import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="appContainer">
        <Sidebar isOpen={isOpen} />
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;