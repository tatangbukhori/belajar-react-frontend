import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/posts`);
    console.log('GET /posts response:', response.data);
    return response.data.data;
};

export const createPost = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/api/posts/store`, data);
    return response.data.data;
};

export const showPost = async (id, data) => {
    const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`, data);
    return response.data.data;
};

export const updatePost = async (id, data) => {
    const response = await axios.patch(`${API_BASE_URL}/api/posts/update/${id}`, data);
    return response.data.data;
};

export const deletePost = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/api/posts/delete/${id}`);
    return response.data.data;
};