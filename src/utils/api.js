import axios from "axios";
import { parseCookies } from "nookies";

// Base URL
axios.defaults.baseURL = "https://edc-test.ilmhub.uz";
axios.defaults.withCredentials = true;

// Axios interceptor to attach token
axios.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies.token || localStorage.getItem("token");
    console.log("DEBUG: Using token =>", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("DEBUG: Axios request headers =>", config.headers);
    return config;
  },
  (error) => {
    console.error("Axios interceptor failed:", error);
    return Promise.reject(error);
  }
);

// API prefixes
const AUTH_API_PREFIX = "/api/auth";
const GROUP_API_PREFIX = "/api/groups";
const REWARD_ITEM_API_PREFIX = "/api/reward-items";
const STUDENT_API_PREFIX = "/api/students";
const TRANSACTION_API_PREFIX = "/api/students";
const USER_API_PREFIX = "/api/users";
const REDEMPTION_API_PREFIX = "/api/redemptions";

// ===== Auth API =====
export const authApi = {
  register: (data) => axios.post(`${AUTH_API_PREFIX}/register`, data),
  login: (data) => axios.post(`${AUTH_API_PREFIX}/login`, data),
  refresh: (data) => axios.post(`${AUTH_API_PREFIX}/refresh`, data),
  logout: (data) => axios.post(`${AUTH_API_PREFIX}/logout`, data),
  me: () => axios.get(`${AUTH_API_PREFIX}/me`),
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
  getMyGroups: () => axios.get(`${GROUP_API_PREFIX}/my-groups`),
};

// ===== Redemption API =====
export const redemptionApi = {
  postRedemption: (data) => axios.post(`${REDEMPTION_API_PREFIX}`, data),
  getRedemption: () => axios.get(`${REDEMPTION_API_PREFIX}`),
  getRedemptionByStudentId: (studentId) =>
    axios.get(`${REDEMPTION_API_PREFIX}/students/${studentId}`),
  putRedemption: (redemptionId, data) =>
    axios.put(`${REDEMPTION_API_PREFIX}/${redemptionId}/status`, data, {
      headers: { "Content-Type": "application/json" },
    }),
  deleteRedemption: (redemptionId) =>
    axios.delete(`${REDEMPTION_API_PREFIX}/${redemptionId}`),
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
  getStudentByNameOrSurname: (nameOrSurname) =>
    axios.get(`${STUDENT_API_PREFIX}/get-by-name/${nameOrSurname}`),
  getStudentById: (id) => axios.get(`${STUDENT_API_PREFIX}/${id}`),
  deleteStudent: (id) => axios.delete(`${STUDENT_API_PREFIX}/${id}`),
  getStudentByCode: (code) =>
    axios.get(`${STUDENT_API_PREFIX}/by-code/${code}`),
  postStudentByIdAndGroupId: (data, id, groupId) =>
    axios.post(`${STUDENT_API_PREFIX}/${id}/groups/${groupId}`, data),
};

// ===== Transaction API =====
export const transactionApi = {
  postTransaction: (studentId, data) =>
    axios.post(`${TRANSACTION_API_PREFIX}/${studentId}/transactions`, data),
  getTransactions: (studentId) =>
    axios.get(`${TRANSACTION_API_PREFIX}/${studentId}/transactions`),
  getTransactionsById: (studentId, transactionId) =>
    axios.get(
      `${TRANSACTION_API_PREFIX}/${studentId}/transactions/${transactionId}`
    ),
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
