import store from '@/store';
import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies';

export interface AppState {
  sidebar: {
    opened: boolean;
  };

  snackbar: {
    visibility: boolean;
    text: string;
  };
}

@Module({ dynamic: true, store, name: 'nav' })
class App extends VuexModule implements AppState {
  public sidebar = {
    opened: getSidebarStatus() !== 'closed'
  };
  public snackbar = {
    visibility: false,
    text: ''
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

  @Mutation
  private SHOW_SNACKBAR(text: string): void {
    this.snackbar.visibility = true;
    this.snackbar.text = text;
  }

  @Mutation
  private CLOSE_SNACKBAR(): void {
    this.snackbar.visibility = false;
    this.snackbar.text = '';
  }

  @Action
  public toggleSidebar(): void {
    this.TOGGLE_SIDEBAR();
  }

  @Action
  public showSnackbar(text: string): void {
    this.SHOW_SNACKBAR(text);
  }

  @Action
  public closeSnackbar(): void {
    this.CLOSE_SNACKBAR();
  }
}

export const AppModule = getModule(App);
