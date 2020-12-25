import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
axios.defaults.timeout = 5000;

export function setInterceptor(): void {
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      return new Promise(() => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // TODO 注销
          // this.$store.dispatch('auth/logout').then();
        }
        throw err;
      });
    }
  );
}

export default axios;
