import axios from "axios";
import { parseCookies } from "nookies";

// Base URL sozlamasi
axios.defaults.baseURL = "https://edc-test.ilmhub.uz"; // debug
axios.defaults.withCredentials = true;

// Interceptor — har bir so‘rovga token qo‘shish
axios.interceptors.request.use(
  (config) => {
    const { token } = parseCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Axios interceptor failed:", error);
    return Promise.reject(error);
  }
);

// API Prefixes
const AUTH_API_PREFIX = "/api/auth";
const GROUP_API_PREFIX = "/api/groups";
const REWARD_ITEM_API_PREFIX = "/api/reward-items";
const STUDENT_API_PREFIX = "/api/students";
const TRANSACTION_API_PREFIX = "/api/students";
const USER_API_PREFIX = "/api/users";

// ====== Auth API ======
export const authApi = {
  register: (data) => axios.post(`${AUTH_API_PREFIX}/register`, data),
  login: (data) => axios.post(`${AUTH_API_PREFIX}/login`, data),
  getConfirmation: () => axios.get(`${AUTH_API_PREFIX}/confirm-email`),
  resendConfirmation: (data) =>
    axios.post(`${AUTH_API_PREFIX}/resend-confirmation`, data),
  forgotPassword: (data) =>
    axios.post(`${AUTH_API_PREFIX}/forgot-password`, data),
  resetPassword: (data) =>
    axios.post(`${AUTH_API_PREFIX}/reset-password`, data),
};

// ===== Group API =====
export const groupApi = {
  getGroupAll: () => axios.get(`${GROUP_API_PREFIX}/get-all`),
  getGroupById: (groupId) =>
    axios.get(`${GROUP_API_PREFIX}/get-by-id/${groupId}`),
  getGroupByName: (groupName) =>
    axios.get(`${GROUP_API_PREFIX}/get-by-name/${groupName}`),
  postGroup: (data) => axios.post(`${GROUP_API_PREFIX}/create`, data),
  putGroup: (groupId) =>
    axios.put(`${GROUP_API_PREFIX}/${groupId}/change-teacher`),
};

// ===== Reward Item API =====
export const rewardItemApi = {
  getItem: () => axios.get(`${REWARD_ITEM_API_PREFIX}`),
  postItem: (data) => axios.post(`${REWARD_ITEM_API_PREFIX}`, data),
  getItemById: (id) => axios.get(`${REWARD_ITEM_API_PREFIX}/${id}`),
  deleteItem: (id) => axios.delete(`${REWARD_ITEM_API_PREFIX}/${id}`),
};

// ===== Students API =====
export const studentApi = {
  postStudent: (data) => axios.post(`${STUDENT_API_PREFIX}/create`, data),
  getStudent: () => axios.get(`${STUDENT_API_PREFIX}`),
  getStudentById: (id) => axios.get(`${STUDENT_API_PREFIX}/${id}`),
  deleteStudent: (id) => axios.delete(`${STUDENT_API_PREFIX}/${id}`),
  getStudentByCode: (code) =>
    axios.get(`${STUDENT_API_PREFIX}/by-code/${code}`),
  postStudentByIdAndGroupId: (data, id, groupId) =>
    axios.post(`${STUDENT_API_PREFIX}/${id}/groups/${groupId}`, data),
};

// ===== Transaction API =====
export const transactionApi = {
  postTransaction: (data, id) =>
    axios.post(`${TRANSACTION_API_PREFIX}/${id}/transactions`, data),
  getTransaction: (id) =>
    axios.get(`${TRANSACTION_API_PREFIX}/${id}/transactions`),
};

// ===== User API =====
export const userApi = {
  getTeacher: () => axios.get(`${USER_API_PREFIX}/teachers`),
  getUser: () => axios.get(`${USER_API_PREFIX}/users`),
  getUserByEmail: (email) =>
    axios.get(`${USER_API_PREFIX}/get-by-email/${email}`),
  getUserById: (id) => axios.get(`${USER_API_PREFIX}/get-by-id/${id}`),
  postUser: (data, id) => axios.post(`${USER_API_PREFIX}/${id}/promote`, data),
  deleteUser: (id) => axios.delete(`${USER_API_PREFIX}/${id}`),
};
