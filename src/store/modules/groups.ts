import firebase from 'firebase/app';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { groupsCollection, userGroupCollection } from '@/plugins/firebase';
import { UserModule } from '@/store/modules/user';

interface Group {
  id: string;
  name: string;
}

interface UserGroup {
  userID: string;
  groupID: string;
}

export interface GroupsState {
  ids: string[];
  data: Group[];
}

@Module({ dynamic: true, store, name: 'groups' })
class Groups extends VuexModule implements GroupsState {
  public ids: string[] = [];
  public data: Group[] = [];
  public watched = false;

  @Mutation
  private SET_GROUPS_ID(ids: string[]) {
    this.ids = ids;
  }

  @Mutation
  private PUSH_GROUPS_ID(id: string) {
    this.ids.push(id);
  }

  @Mutation
  private SET_GROUPS(groups: Group[]) {
    this.data = groups;
  }

  @Mutation
  private PUSH_DATA(group: Group) {
    this.data.push(group);
  }

  @Mutation
  private CHANGE_GROUP(change: {
    newIndex: number;
    oldIndex: number;
    doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
    type: string;
  }) {
    const { newIndex, oldIndex, doc, type } = change;
    switch (type) {
      case 'added': {
        const group: Group = doc.data() as Group;
        this.data.splice(newIndex, 0, { ...group });
        break;
      }
      case 'modified': {
        this.data.splice(oldIndex, 1);
        const group: Group = doc.data() as Group;
        this.data.splice(newIndex, 0, { ...group });
        break;
      }
      case 'removed': {
        this.data.splice(oldIndex, 1);
        break;
      }
    }
  }

  @Action
  public async fetchUserGroup() {
    if (!UserModule.signedIn) {
      return;
    }

    // 获取 userID 关联的 groupID 列表。
    await userGroupCollection
      .where('userID', '==', UserModule.id)
      .get()
      .then((snapshot) => {
        this.SET_GROUPS_ID([]);
        snapshot.forEach((doc) => {
          this.PUSH_GROUPS_ID((doc.data() as UserGroup).groupID);
        });
      });

    // 获取用户组详情。
    this.SET_GROUPS([]);
    for (const id of this.ids) {
      await groupsCollection
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const group: Group = doc.data() as Group;
            group.id = doc.id;
            this.PUSH_DATA(group);
          }
        });
    }
  }
}

export const GroupsModule = getModule(Groups);
