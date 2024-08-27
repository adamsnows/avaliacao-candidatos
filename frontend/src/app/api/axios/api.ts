import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "https://comigotech-backend-nhttpfvqia-uc.a.run.app/api",
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
