import { auth, profilesCollection } from '@/plugins/firebase';
import firebase from 'firebase/app';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import api from '@/api';
import { getToken, setToken, removeToken } from '@/utils/cookies';

export const DEFAULT_PHOTO_URL = '/avatar04.jpg';

export interface UserState {
  id: string;
  token: string;
  displayName: string;
  photoURL: string;
  email: string;
  signedIn: boolean;
}

// @Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public id = '';
  public token = getToken() || '';
  public displayName = 'Yang';
  public photoURL = DEFAULT_PHOTO_URL;
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
    this.displayName = name;
  }

  @Mutation
  private SET_AVATAR(avatar: string): void {
    this.photoURL = avatar;
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

interface Profile {
  email: string;
  displayName: string;
  photoURL: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User2 extends VuexModule implements UserState {
  public id = '';
  public token = '';
  public displayName = '';
  public photoURL = '';
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
  private SET_DISPLAY_NAME(name: string): void {
    this.displayName = name;
  }

  @Mutation
  private SET_PHOTO_URL(url: string): void {
    this.photoURL = url;
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
      this.SET_DISPLAY_NAME(typeof user.displayName === 'string' ? user.displayName : '');
      this.SET_PHOTO_URL(typeof user.photoURL === 'string' ? user.photoURL : DEFAULT_PHOTO_URL);
    } else {
      this.SET_ID('');
      this.SET_EMAIL('');
      this.SET_DISPLAY_NAME('');
      this.SET_PHOTO_URL(DEFAULT_PHOTO_URL);
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
  public async signup(userInfo: { email: string; displayName: string; password: string; photoURL?: string }) {
    let { email, displayName, password, photoURL } = userInfo;
    email = email.trim();
    displayName = displayName.trim();
    password = password.trim();
    photoURL = photoURL?.trim();

    const { user } = await auth.createUserWithEmailAndPassword(email, password).catch((reason) => {
      console.error('create user error:', reason);
      return Promise.reject(reason);
    });

    if (user) {
      await user.updateProfile({ displayName: displayName, photoURL: photoURL }).catch((reason) => {
        console.error('update profile error:', reason);
        return Promise.reject(reason);
      });

      // 创建用户资料。
      const profile: Profile = {
        email: email,
        displayName: displayName,
        photoURL: ''
      };
      await profilesCollection
        .doc(user.uid)
        .set(profile)
        .catch((reason) => {
          console.error('create user profile error:', reason);
          user.delete();
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

export const UserModule = getModule(User2);
