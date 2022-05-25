import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { useAuth } from '../context/UserContext';

export const API_URL =
  process.env.API_BASE_URL || "http://localhost:3001/";

export const NEXT_URL =
  process.env.FRONTEND_BASE_URL || "http://localhost:3000/";

// export const requestApi = async (config: AxiosRequestConfig): Promise<any> => {
//   const api = axios.create({
//     baseURL: API_URL,
//   });

//   const resp = await api.request(config).catch((e) => {
//     return Promise.reject(e);
//   });

//   return resp;
// };

export const api = axios.create({
  baseURL: API_URL,
});

export const nextApi = axios.create({
  baseURL: NEXT_URL,
});

export const authorizedRequest = async (token: string, config: AxiosRequestConfig) => {
  config = { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } }
  try {
    const resp = await api.request(config);
    return resp;
  } catch (e) {
    console.log(e);
    if (e.code === 401) {

    } else {
      throw e;
    }
  }
}