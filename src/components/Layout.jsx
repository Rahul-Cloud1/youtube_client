import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <div className="appLayout">
        <Sidebar />

        <main className="main">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;