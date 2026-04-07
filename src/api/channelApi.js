import API from "./axios";

export const createChannel = (data) => API.post("/channels", data);
export const getChannel = (id) => API.get(`/channels/${id}`);
export const getChannelVideos = (id) => API.get(`/channels/${id}/videos`);
export const subscribeChannel = (id) => API.put(`/channels/subscribe/${id}`);