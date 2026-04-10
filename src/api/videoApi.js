import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/videos",
});

// 🔐 attach token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// 📺 VIDEO CRUD OPERATIONS
export const fetchVideos = (params) => API.get("/", { params });
export const fetchVideo = (id) => API.get(`/${id}`);
export const createVideo = (data) => API.post("/", data);
export const updateVideo = (id, data) => API.put(`/${id}`, data);
export const deleteVideo = (id) => API.delete(`/${id}`);

// 📄 CHANNEL VIDEOS
export const getVideosByChannel = (channelId) => API.get(`/channel/${channelId}`);

// ❤️ INTERACTIONS
export const addView = (id) => API.put(`/view/${id}`);
export const likeVideo = (id) => API.put(`/like/${id}`);
export const dislikeVideo = (id) => API.put(`/dislike/${id}`);