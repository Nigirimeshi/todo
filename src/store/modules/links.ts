import { VuexModule, Module, getModule } from 'vuex-module-decorators';
import store from '@/store';

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
  data = [
    {
      text: 'Dashboard',
      icon: 'mdi-view-dashboard',
      route: '/'
    },
    {
      text: 'Folder',
      icon: 'mdi-folder',
      route: '/projects'
    },
    {
      text: 'Person',
      icon: 'mdi-account',
      route: '/team'
    },
    {
      text: 'Login',
      icon: 'mdi-login-variant',
      route: '/login'
    },
    {
      text: 'Signup',
      icon: 'mdi-account-plus',
      route: '/signup'
    }
  ];
}

export const LinksModule = getModule(Links);
