import Vue from 'vue';
import Vuex from 'vuex';
import { config } from 'vuex-module-decorators';

import { AppState } from '@/store/modules/app';
import { UserState } from '@/store/modules/user';
import { LinksState } from '@/store/modules/links';
import { TodoListState } from '@/store/modules/todo-list';
import { GroupsState } from '@/store/modules/groups';
import { ProfilesState } from '@/store/modules/profiles';

// 将所有 @Action 装饰器的 rawError 默认值设置为 true。
config.rawError = true;

Vue.use(Vuex);

export interface RootState {
  nav: AppState;
  links: LinksState;
  user: UserState;
  todoList: TodoListState;
  groups: GroupsState;
  profiles: ProfilesState;
}

// 先声明空的 store，之后再动态注册所有模块。
export default new Vuex.Store<RootState>({});
