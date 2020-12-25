import Vue from 'vue';
import Vuex from 'vuex';
import { config } from 'vuex-module-decorators';

import { NavState } from '@/store/modules/nav';
import { AuthState } from '@/store/modules/auth';
import { LinksState } from '@/store/modules/links';
import { ProfileState } from '@/store/modules/profile';
import { ProjectsState } from '@/store/modules/projects';
import { SnackbarState } from '@/store/modules/snackbar';

// 默认情况下，在所有 @Action 装饰器上将 rawError 设置为 true。
config.rawError = true;

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

export interface RootState {
  nav: NavState;
  snackbar: SnackbarState;
  links: LinksState;
  auth: AuthState;
  projects: ProjectsState;
  profile: ProfileState;
}

const store = new Vuex.Store<RootState>({});

export default store;
