import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/authStore";

const base = (import.meta.env.VITE_API_BASE_URL as string || "").replace(/\/+$/, "");

const api = axios.create({ baseURL: base });

// queue while refreshing
let isRefreshing = false;
let refreshQueue: Array<(token?: string)=>void> = [];

function processQueue(token?: string) {
  refreshQueue.forEach(cb => cb(token));
  refreshQueue = [];
}

api.interceptors.request.use((config) => {
  const store = useAuthStore();
  const token = store.accessToken;

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  r => r,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    const store = useAuthStore();

    if (error.response?.status === 401 && !original._retry) {
      // if there is refresh token
      if (!store.refreshToken) {
        // force logout
        store.logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // queue and wait
        return new Promise((resolve, reject) => {
          refreshQueue.push((token?: string) => {
            if (token) {
              if (original.headers) original.headers.Authorization = `Bearer ${token}`;
              resolve(api(original));
            } else {
              reject(error);
            }
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/auth/refresh", {
          accessToken: store.accessToken,
          refreshToken: store.refreshToken
        });
        const data = res.data;
        store.setTokens(data.token, data.refreshToken, data.expiresAt);
        processQueue(data.token);
        isRefreshing = false;

        if (original.headers) original.headers.Authorization = `Bearer ${data.token}`;
        return api(original);
      } catch (refreshErr) {
        isRefreshing = false;
        processQueue();
        store.logout();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
