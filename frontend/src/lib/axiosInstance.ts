import axios from 'axios';
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Inject access_token automatically into headers
axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

export default axiosInstance;