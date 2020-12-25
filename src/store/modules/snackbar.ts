import {
  Module,
  Mutation,
  VuexModule,
  getModule
} from 'vuex-module-decorators';

import store from '@/store';
import get = Reflect.get;

export interface SnackbarState {
  visibility: boolean;
  text: string;
}

@Module({ dynamic: true, store, name: 'snackbar' })
class Snackbar extends VuexModule implements SnackbarState {
  visibility = false;
  text = '';

  @Mutation
  showSnackbar(text: string): void {
    this.visibility = true;
    this.text = text;
  }

  @Mutation
  closeSnackbar(): void {
    this.visibility = false;
    this.text = '';
  }
}

export const SnackbarModule = getModule(Snackbar);
