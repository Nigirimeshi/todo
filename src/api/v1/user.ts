import axios, { AxiosResponse } from 'axios';
import { APIResponseError, APIResponseNotAsExpected } from '@/api';

const LOGIN_URL = process.env.VUE_APP_API_V1_LOGIN;
const SIGNUP_URL = process.env.VUE_APP_API_V1_SIGNUP;

// 发送登录请求
const login = (email: string, password: string) => {
  return axios.post(LOGIN_URL, {
    user: {
      email: email,
      password: password
    }
  });
};

// 发送注册请求
const signup = (email: string, username: string, password: string) => {
  return axios.post(SIGNUP_URL, {
    user: {
      email: email,
      username: username,
      password: password
    }
  });
};

export default {
  login,
  signup,

  // 发送登录请求
  login2(email: string, password: string) {
    const data = {
      user: {
        email: email,
        password: password
      }
    };
    return axios
      .post(LOGIN_URL, data)
      .then((resp) => {
        const { token, username, email } = resp.data.user;
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
  signup2(email: string, username: string, password: string) {
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
        const { token, username, email } = resp.data.user;
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
  }
};
