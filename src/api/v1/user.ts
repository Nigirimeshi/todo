import axios from 'axios';

const LOGIN_URL = process.env.VUE_APP_API_V1_LOGIN;
const SIGNUP_URL = process.env.VUE_APP_API_V1_SIGNUP;

interface loginSuccessResponse {
  user: {
    token: string;
    username: string;
    email: string;
  };
}

interface loginFailedResponse {
  errors: {
    error: string[];
  };
}

type signupSuccessResponse = loginSuccessResponse;

interface signupFailedResponse {
  errors: {
    email: string[];
    username: string[];
    password: string[];
  };
}

// 发送登录请求
const login = (email: string, password: string) => {
  return axios
    .post(LOGIN_URL, {
      user: {
        email: email,
        password: password
      }
    })
    .then((resp) => {
      const userInfo = (resp.data as loginSuccessResponse).user;
      return Promise.resolve(userInfo);
    })
    .catch((err) => {
      try {
        const { error } = (err.response.data as loginFailedResponse).errors;
        return Promise.reject({ email: error });
      } catch (error) {
        console.error(error);
        return Promise.reject(err);
      }
    });
};

// 发送注册请求
const signup = (email: string, username: string, password: string) => {
  return axios
    .post(SIGNUP_URL, {
      user: {
        email: email,
        username: username,
        password: password
      }
    })
    .then((resp) => {
      const userInfo = (resp.data as signupSuccessResponse).user;
      return Promise.resolve(userInfo);
    })
    .catch((err) => {
      try {
        const { email, username, password } = (err.response.data as signupFailedResponse).errors;
        return Promise.reject({ email, username, password });
      } catch (error) {
        console.error(error);
        return Promise.reject(err);
      }
    });
};

export default {
  login,
  signup
};
