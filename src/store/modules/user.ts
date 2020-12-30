import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import api from '@/api';
import { getToken, setToken, removeToken } from '@/utils/cookies';

export interface UserState {
  token: string;
  name: string;
  avatar: string;
  email: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public token = getToken() || '';
  public name = 'Yang';
  public avatar = '/avatar03.jpg';
  public email = '';

  @Mutation
  private SET_TOKEN(token: string): void {
    this.token = token;
  }

  @Mutation
  private SET_NAME(name: string): void {
    this.name = name;
  }

  @Mutation
  private SET_AVATAR(avatar: string): void {
    this.avatar = avatar;
  }

  @Mutation
  private SET_EMAIL(email: string): void {
    this.email = email;
  }

  @Action
  public resetToken() {
    this.SET_TOKEN('');
    removeToken();
  }

  @Action
  public async login(userInfo: { email: string; password: string }) {
    let { email, password } = userInfo;
    email = email.trim();
    password = password.trim();
    const { token } = await api.user.login(email, password);
    setToken(token);
  }

  @Action
  public async signup(userInfo: { email: string; username: string; password: string }) {
    let { email, username, password } = userInfo;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    const { token } = await api.user.signup(email, username, password);
    setToken(token);
  }

  @Action
  public logout() {
    if (this.token === '') {
      throw Error('logout: token is empty string!');
    }
    // TODO 发送注销请求。
    this.resetToken();
  }
}

export const UserModule = getModule(User);
