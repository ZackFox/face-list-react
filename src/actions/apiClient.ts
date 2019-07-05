import axios, { AxiosRequestConfig } from 'axios';
import cookies from 'js-cookie';

const apiClient = axios.create();

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = cookies.get('token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    cookies.remove('token');
    return Promise.reject(err);
  },
);

export default apiClient;
