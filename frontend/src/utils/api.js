import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getPosts = () => api.get("/posts").then((res) => res.data);
export const getPost = (id) => api.get(`/posts/${id}`).then((res) => res.data);
export const createPost = (postData) =>
  api.post("/posts", postData).then((res) => res.data);
export const editPost = (postData, postid) =>
  api.patch(`/posts/${postid}`, postData).then((res) => res.data);
export const likePost = (id) =>
  api.post(`/posts/${id}/like`).then((res) => res.data);
export const savePost = (id) =>
  api.post(`/posts/${id}/save`).then((res) => res.data);
export const ratePost = (id, rating) =>
  api.post(`/posts/${id}/rate`, { rating }).then((res) => res.data);
export const getUserPosts = () =>
  api.get("/users/posts").then((res) => res.data);
export const getUserStats = () =>
  api.get("/users/stats").then((res) => res.data);
export const donateToAuthor = (authorId, amount, paymentMethod) =>
  api
    .post(`/payments/donate`, { authorId, amount, paymentMethod })
    .then((res) => res.data);

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);
export const register = (username, email, password) =>
  api
    .post("/auth/register", { username, email, password })
    .then((res) => res.data);
export const logout = () => api.post("/auth/logout").then((res) => res.data);
export const getCurrentUser = () => api.get("/auth/me").then((res) => res.data);
export const sharePost = (id) => {
  return api.get(`/posts/${id}/share`).then((res) => {
    // Assuming the backend returns a shareable link or sharing info
    const shareLink = `${window.location.origin}/post/${id}`;

    // You could implement social media sharing here
    // For now, we'll just copy the link to clipboard
    navigator.clipboard
      .writeText(shareLink)
      .then(() => console.log("Link copied to clipboard"))
      .catch((err) => console.error("Failed to copy link: ", err));

    return {
      message: "Post link copied to clipboard",
      shareLink: shareLink,
    };
  });
};
export const verifyEmail = (token) =>
  api.get(`/auth/verify-email/${token}`).then((res) => res.data);
