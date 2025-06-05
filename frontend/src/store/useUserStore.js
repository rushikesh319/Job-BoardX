import axios from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";


export const useUserStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  checkingAuth: true,

  setUserAndToken: (user, token) => set({ user, token }),

  signup: async ({ name, email, password, role }) => {
		set({ loading: true });
		try {
			const res = await axios.post("/auth/signup", { name, email, password ,role });
			set({ user: res.data.user , loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post('/auth/login', { email, password });
      set({ user: res.data.user, token: res.data.token, loading: false });
    } catch (err) {
      set({ loading: false });
      toast.error(err.response?.data?.message || 'Login failed');
    }
  },

  logout: async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      toast.error('Logout failed');
    }
    set({ user: null, token: null });
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true });
    try {
      const res = await axios.post('/auth/refresh-token');
      set({ token: res.data.token, checkingAuth: false });
      return res.data;
    } catch (err) {
      set({ user: null, token: null, checkingAuth: false });
      throw err;
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get('/auth/profile');
      set({ user: res.data.user, checkingAuth: false });
    } catch (err) {
      set({ checkingAuth: false, user: null, token: null });
    }
  }
}));

axios.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise = null;
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;
        return axios(originalRequest);
      } catch (refreshErr) {
        useUserStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);
