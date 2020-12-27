import axios from 'axios';
import { UserModule } from '@/store/modules/user';

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
axios.defaults.timeout = 5000;

const TOKEN_HEADER = 'Authorization';

export function useRequestInterceptor(): void {
  axios.interceptors.request.use(
    (config) => {
      if (UserModule.token) {
        config.headers[TOKEN_HEADER] = UserModule.token;
      }
      return config;
    },
    (err) => {
      return new Promise(() => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          UserModule.logout();
        }
        throw err;
      });
    }
  );
}

export function setHeader(key: string, value: string): void {
  axios.defaults.headers.common[key] = value;
}

export function removeHeader(key: string): void {
  delete axios.defaults.headers.common[key];
}

export default axios;
