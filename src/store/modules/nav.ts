import {
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export interface NavState {
  drawer: boolean;
}

@Module({ dynamic: true, store, name: 'nav' })
class Nav extends VuexModule implements NavState {
  drawer = true;

  @Mutation
  switchDrawer(): void {
    this.drawer = !this.drawer;
  }
}

export const NavModule = getModule(Nav);
