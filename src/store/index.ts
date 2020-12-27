import Vue from 'vue';
import Vuex from 'vuex';
import { config } from 'vuex-module-decorators';

import { NavState } from '@/store/modules/nav';
import { UserState } from '@/store/modules/user';
import { LinksState } from '@/store/modules/links';
import { ProjectsState } from '@/store/modules/projects';
import { SnackbarState } from '@/store/modules/snackbar';

// 将所有 @Action 装饰器的 rawError 默认值设置为 true。
config.rawError = true;

Vue.use(Vuex);

export interface RootState {
  nav: NavState;
  snackbar: SnackbarState;
  links: LinksState;
  user: UserState;
  projects: ProjectsState;
}

// 先声明空的 store，之后再动态注册所有模块。
export default new Vuex.Store<RootState>({});
