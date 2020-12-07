import axios from 'axios';

axios.defaults.baseURL = '/api/v1';
axios.defaults.timeout = 5000;

export function setInterceptor() {
  axios.interceptors.request.use(
    function(config) {
      return config;
    },
    function(err) {
      return new Promise(() => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('auth/logout').then(() => {});
        }
        throw err;
      });
    }
  );
}

export default axios;
