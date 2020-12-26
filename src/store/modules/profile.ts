import { VuexModule, Module, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface ProfileState {
  username: string;
  avatar: string;
}

@Module({ dynamic: true, store, name: 'profile' })
class Profile extends VuexModule implements ProfileState {
  username = 'Yang';
  avatar = '/avatar03.jpg';
}

export const ProfileModule = getModule(Profile);
