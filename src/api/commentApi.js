import API from "./axios";

export const getComments = (videoId) => API.get(`/comments/${videoId}`);
export const addComment = (data) => API.post("/comments", data);
export const updateComment = (id, data) => API.put(`/comments/${id}`, data);
export const deleteComment = (id) => API.delete(`/comments/${id}`);