import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;