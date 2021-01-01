import { auth } from '@/plugins/firebase';
import firebase from 'firebase/app';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import api from '@/api';
import { getToken, setToken, removeToken } from '@/utils/cookies';

export const DEFAULT_PHOTO_URL = '/avatar04.jpg';

export interface UserState {
  id: string;
  token: string;
  name: string;
  avatar: string;
  email: string;
  signedIn: boolean;
}

// @Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public id = '';
  public token = getToken() || '';
  public name = 'Yang';
  public avatar = DEFAULT_PHOTO_URL;
  public email = '';
  public signedIn = false;

  @Mutation
  private SET_ID(id: string): void {
    this.id = id;
  }

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

  @Mutation
  private SET_SIGNED_IN(state: boolean): void {
    this.signedIn = state;
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
    this.SET_SIGNED_IN(true);
  }

  @Action
  public async signup(userInfo: { email: string; username: string; password: string }) {
    let { email, username, password } = userInfo;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    const { token } = await api.user.signup(email, username, password);
    setToken(token);
    this.SET_SIGNED_IN(true);
  }

  @Action
  public logout() {
    if (this.token === '') {
      throw Error('logout: token is empty string!');
    }
    this.resetToken();
    this.SET_SIGNED_IN(false);
  }
}

@Module({ dynamic: true, store, name: 'user' })
class FirebaseUser extends VuexModule implements UserState {
  public id = '';
  public token = '';
  public name = '';
  public avatar = '';
  public email = '';
  public signedIn = false;

  @Mutation
  private SET_ID(id: string): void {
    this.id = id;
  }

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

  @Mutation
  private SET_SIGNED_IN(state: boolean): void {
    this.signedIn = state;
  }

  @Action
  public setUser(user: firebase.User | null) {
    if (user) {
      this.SET_ID(user.uid);
      this.SET_EMAIL(typeof user.email === 'string' ? user.email : '');
      this.SET_NAME(typeof user.displayName === 'string' ? user.displayName : '');
      this.SET_AVATAR(typeof user.photoURL === 'string' ? user.photoURL : DEFAULT_PHOTO_URL);
    } else {
      this.SET_ID('');
      this.SET_EMAIL('');
      this.SET_NAME('');
      this.SET_AVATAR(DEFAULT_PHOTO_URL);
    }
  }

  @Action
  public setSignedIn(state: boolean) {
    this.SET_SIGNED_IN(state);
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

    const { user } = await auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return auth.signInWithEmailAndPassword(email, password);
      })
      .catch((reason) => {
        console.error(reason);
        return Promise.reject(reason);
      });

    if (user) {
      this.setUser(user);
      this.setSignedIn(true);
    }
  }

  @Action
  public async signup(userInfo: { email: string; username: string; password: string }) {
    let { email, username, password } = userInfo;
    email = email.trim();
    username = username.trim();
    password = password.trim();

    const { user } = await auth.createUserWithEmailAndPassword(email, password).catch((reason) => {
      console.error(reason);
      return Promise.reject(reason);
    });

    if (user) {
      await user.updateProfile({ displayName: username }).catch((reason) => {
        console.error(reason);
        return Promise.reject(reason);
      });
      this.setUser(user);
      this.setSignedIn(true);
    }
  }

  @Action
  public logout() {
    auth
      .signOut()
      .then(() => {
        this.setUser(null);
        this.setSignedIn(false);
      })
      .catch((reason) => {
        console.error(reason);
        return Promise.reject(reason);
      });
  }
}

export const UserModule = getModule(FirebaseUser);
