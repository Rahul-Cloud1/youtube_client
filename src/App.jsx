import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/video/:id" element={<VideoPlayer />} />
      </Routes>
    </Layout>
  );
}

export default App;