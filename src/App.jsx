import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/AuthGuard";
import { useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Channel from "./pages/Channel";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";

function App() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>

        {/* First screen logic */}
        <Route path="/" element={
          user ? <Navigate to="/home" /> : <Navigate to="/login" />
        } />

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={
          <PublicRoute><Login /></PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute><Register /></PublicRoute>
        } />

        {/* PRIVATE ROUTES */}
        <Route path="/home" element={
          <PrivateRoute><Home /></PrivateRoute>
        } />

        <Route path="/video/:id" element={
          <PrivateRoute><VideoPlayer /></PrivateRoute>
        } />

        <Route path="/channel/:id" element={
          <PrivateRoute><Channel /></PrivateRoute>
        } />

        <Route path="/upload" element={
          <PrivateRoute><Upload /></PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />

      </Routes>
    </Layout>
  );
}

export default App; 