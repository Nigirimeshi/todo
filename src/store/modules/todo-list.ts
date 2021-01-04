import firebase from 'firebase/app';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import store from '@/store';
import { ProfilesModule } from '@/store/modules/profiles';
import { todosCollection } from '@/plugins/firebase';

export interface Todo {
  id?: string;
  title: string;
  content: string;
  due: null | string;
  status: string;
  userID: string;
  owner?: string;
}

export interface TodoListState {
  todos: Todo[];
  watched: boolean;
  selectedTodo: Todo;
  userIDs: Map<string, null>;
}

@Module({ dynamic: true, store, name: 'todo-list' })
class TodoList extends VuexModule implements TodoListState {
  public todos: Todo[] = [];

  public watched = false;

  public selectedTodo: Todo = {
    id: '',
    title: '',
    content: '',
    status: '',
    due: '',
    userID: ''
  };

  public userIDs: Map<string, null> = new Map<string, null>();

  public readonly selectableStates = ['ongoing', 'complete', 'overdue'];

  // 返回当前用户的所有待办事项。
  public get myTodoList() {
    return (userID: string): Todo[] => {
      return this.todos.filter((todo: Todo) => {
        return todo.userID === userID;
      });
    };
  }

  @Mutation
  private SET_WATCHED(val: boolean): void {
    this.watched = val;
  }

  @Mutation
  public SET_SELECTED_TODO(id: string): void {
    for (const p of this.todos) {
      if (p.id === id) {
        this.selectedTodo = p;
      }
    }
  }

  // 增加、修改、删除待办事项。
  @Action
  private CHANGE_TODO(change: {
    newIndex: number;
    oldIndex: number;
    doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
    type: string;
  }) {
    const { newIndex, oldIndex, doc, type } = change;
    switch (type) {
      case 'added': {
        const todo: Todo = doc.data() as Todo;
        this.todos.splice(newIndex, 0, { ...todo, id: doc.id });
        this.userIDs.set(todo.userID, null);
        break;
      }
      case 'modified': {
        this.todos.splice(oldIndex, 1);
        const todo: Todo = doc.data() as Todo;
        this.todos.splice(newIndex, 0, { ...todo, id: doc.id });
        break;
      }
      case 'removed': {
        this.userIDs.delete(this.todos[oldIndex].userID);
        this.todos.splice(oldIndex, 1);
        break;
      }
    }
  }

  @Mutation
  private SORT_BY(prop: string): void {
    switch (prop) {
      case 'title':
        this.todos.sort((a, b) => (a.title < b.title ? -1 : 1));
        break;
    }
  }

  @Mutation
  private FILL_TODOS_OWNER() {
    for (const i in this.todos) {
      const userID = this.todos[i].userID;
      const userProfile = ProfilesModule.indexes.get(userID);
      if (userProfile) {
        const todo = this.todos[i];
        todo.owner = userProfile.displayName;
        this.todos.splice(Number(i), 1, todo);
      }
    }
  }

  @Action
  public sort_by(prop: string) {
    this.SORT_BY(prop);
  }

  // 实时更新 TodoList，只能执行一次。
  @Action
  public async watcher() {
    if (!this.watched) {
      this.SET_WATCHED(true);
      // unsubscribe can be called to stop listening for changes
      todosCollection.onSnapshot(
        (ref) => {
          ref.docChanges().forEach((change) => {
            const { newIndex, oldIndex, doc, type } = change;
            this.CHANGE_TODO({ newIndex, oldIndex, doc, type });
          });
          const userIDs = [...TodoListModule.userIDs.keys()];
          ProfilesModule.buildIndexes(userIDs).then(() => {
            this.FILL_TODOS_OWNER();
          });
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  // 新增一个待办事项。
  @Action
  public async add(todo: Todo): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return todosCollection.add(todo).catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  // 更新一个待办事项。
  @Action
  public async update(todo: Todo): Promise<void> {
    const id = todo.id;
    delete todo.id;
    return todosCollection
      .doc(id)
      .update(todo)
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  // 删除多个待办事项。
  @Action
  public async deletes(ids: string[]): Promise<unknown> {
    const errors: unknown[] = [];
    for (const id of ids) {
      todosCollection
        .doc(id)
        .delete()
        .catch((err) => {
          console.error(err);
          errors.push(err);
        });
    }
    if (errors.length > 0) {
      return Promise.reject({
        errors,
        message: errors.length.toString() + ' errors have occurred.'
      });
    } else {
      return Promise.resolve();
    }
  }
}

export const TodoListModule = getModule(TodoList);
