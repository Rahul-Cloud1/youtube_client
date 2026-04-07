import API from "./axios";

export const fetchVideos = (params) => API.get("/videos", { params });
export const fetchVideo = (id) => API.get(`/videos/${id}`);
export const likeVideo = (id) => API.put(`/videos/like/${id}`);
export const dislikeVideo = (id) => API.put(`/videos/dislike/${id}`);
export const addView = (id) => API.put(`/videos/view/${id}`);