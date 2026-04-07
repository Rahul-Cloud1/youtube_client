import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import VideoPage from "./pages/VideoPage";
import ChannelPage from "./pages/ChannelPage";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;