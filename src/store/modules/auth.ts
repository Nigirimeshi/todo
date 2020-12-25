import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';
import api from '@/api';

const TOKEN_KEY = 'token';

export interface AuthState {
  loggedIn: boolean;
}

@Module({ dynamic: true, store, name: 'auth' })
class Auth extends VuexModule implements AuthState {
  loggedIn = false;

  @Mutation
  authSuccess(): void {
    this.loggedIn = true;
  }

  @Mutation
  authFailed(): void {
    this.loggedIn = false;
  }

  @Action
  login(email: string, password: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      api.auth
        .login(email, password)
        .then((resp) => {
          this.authSuccess();
          const token = resp.token;
          localStorage.setItem(TOKEN_KEY, token);
          api.auth.setAuthorizationHeader(token);
          resolve(resp);
        })
        .catch((err) => {
          this.authFailed();
          localStorage.removeItem(TOKEN_KEY);
          reject(err);
        });
    });
  }

  @Action
  signup(email: string, username: string, password: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      api.auth
        .signup(email, username, password)
        .then((resp) => {
          this.authSuccess();
          const token = resp.token;
          localStorage.setItem(TOKEN_KEY, token);
          api.auth.setAuthorizationHeader(token);
          resolve(resp);
        })
        .catch((err) => {
          this.authFailed();
          localStorage.removeItem(TOKEN_KEY);
          reject(err);
        });
    });
  }

  @Action
  logout(): void {
    this.authFailed();
    localStorage.removeItem(TOKEN_KEY);
    api.auth.removeAuthorizationHeader();
  }

  @Action
  loadToken(): void {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.authSuccess();
      api.auth.setAuthorizationHeader(token);
    }
  }
}
export const AuthModule = getModule(Auth);
