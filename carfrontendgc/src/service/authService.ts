import axios from 'axios';

const API_URL = 'http://34.107.35.234/';

export const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + 'register/', {
        username,
        email,
        password,
    });
};

export const login = (username: string, password: string) => {
    return axios.post(API_URL + 'login/', {
        username,
        password,
    });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user') || '{}');
};
