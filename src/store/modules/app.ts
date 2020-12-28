import store from '@/store';
import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies';

export interface AppState {
  sidebar: {
    opened: boolean;
  };
}

@Module({ dynamic: true, store, name: 'nav' })
class App extends VuexModule implements AppState {
  public sidebar = {
    opened: getSidebarStatus() !== 'closed'
  };

  @Mutation
  private TOGGLE_SIDEBAR(): void {
    this.sidebar.opened = !this.sidebar.opened;
    if (this.sidebar.opened) {
      setSidebarStatus('opened');
    } else {
      setSidebarStatus('closed');
    }
  }

  @Action
  public toggleSidebar(): void {
    this.TOGGLE_SIDEBAR();
  }
}

export const AppModule = getModule(App);
