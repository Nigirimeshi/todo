import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { profilesCollection } from '@/plugins/firebase';

export interface Profile {
  displayName: string;
  email: string;
  photoURL: string;
}

export interface ProfilesState {
  indexes: Map<string, Profile>;
}

@Module({ dynamic: true, store, name: 'profiles' })
class Profiles extends VuexModule implements ProfilesState {
  public indexes: Map<string, Profile> = new Map<string, Profile>();

  @Mutation
  private SET({ userID, profile }: { userID: string; profile: Profile }) {
    this.indexes.set(userID, profile);
  }

  @Mutation
  private CLEAR() {
    this.indexes.clear();
  }

  @Action
  public async buildIndexes(userIDs: string[]) {
    this.CLEAR();
    for (const id of userIDs) {
      const profile = await profilesCollection
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return doc.data() as Profile;
          }
        });

      if (profile) {
        this.SET({ userID: id, profile: profile });
      }
    }
  }
}

export const ProfilesModule = getModule(Profiles);
