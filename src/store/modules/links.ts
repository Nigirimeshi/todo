import store from '@/store';
import { VuexModule, Module, getModule } from 'vuex-module-decorators';

export interface Link {
  text: string;
  icon: string;
  route: string;
}

export interface LinksState {
  data: Link[];
}

@Module({ dynamic: true, store, name: 'links' })
class Links extends VuexModule implements LinksState {
  public data = [
    {
      text: 'Dashboard',
      icon: 'mdi-view-dashboard',
      route: '/'
    },
    {
      text: 'Todos',
      icon: 'mdi-folder',
      route: '/todo-list'
    },
    {
      text: 'index.vue',
      icon: 'mdi-login-variant',
      route: '/login'
    },
    {
      text: 'index.vue',
      icon: 'mdi-account-plus',
      route: '/signup'
    }
  ];
}

export const LinksModule = getModule(Links);
