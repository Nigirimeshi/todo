import { APIResponseError, APIResponseNotAsExpected } from '@/api';
import axios from 'axios';

const LOGIN_URL = process.env.VUE_APP_API_V1_LOGIN;
const SIGNUP_URL = process.env.VUE_APP_API_V1_SIGNUP;

export default {
  // 发送登录请求
  login(email, password) {
    const data = {
      user: {
        email: email,
        password: password
      }
    };
    return axios
      .post(LOGIN_URL, data)
      .then((resp) => {
        const token = resp.data.user.token;
        const username = resp.data.user.username;
        const email = resp.data.user.email;
        if (token && username && email) {
          return Promise.resolve({
            token,
            username,
            email
          });
        } else {
          return APIResponseNotAsExpected(LOGIN_URL);
        }
      })
      .catch((err) => {
        if (err.response) {
          const data = err.response.data;
          const errors = data.errors;
          if (errors) {
            if (errors.error) {
              return Promise.reject({
                email: errors.error
              });
            }
          }
        }
        return APIResponseError(err.message);
      });
  },

  // 发送注册请求
  signup(email, username, password) {
    const data = {
      user: {
        email: email,
        username: username,
        password: password
      }
    };
    return axios
      .post(SIGNUP_URL, data)
      .then((resp) => {
        const token = resp.data.user.token;
        const username = resp.data.user.username;
        const email = resp.data.user.email;
        if (token && username && email) {
          return Promise.resolve({
            token,
            username,
            email
          });
        } else {
          return APIResponseNotAsExpected(SIGNUP_URL);
        }
      })
      .catch((err) => {
        if (err.response) {
          const data = err.response.data;
          const errors = data.errors;
          if (errors) {
            if (errors.error) {
              return APIResponseError(errors.error);
            }
            const email = errors.email;
            const username = errors.username;
            const password = errors.password;
            return Promise.reject({
              email,
              username,
              password
            });
          }
        }
        return APIResponseError(err.message);
      });
  },

  // 设置 axios 默认请求头的认证信息
  setAuthorizationHeader(token) {
    axios.defaults.headers.common['Authorization'] = token;
  },

  removeAuthorizationHeader() {
    delete axios.defaults.headers.common['Authorization'];
  }
};
