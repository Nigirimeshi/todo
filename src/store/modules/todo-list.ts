import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
import firebase from 'firebase/app';
import { projectsCollection } from '@/plugins/firebase';

export interface Todo {
  id?: string;
  title: string;
  content: string;
  due: null | string;
  person: string;
  status: string;
}

export interface TodoListState {
  todos: Todo[];
  watched: boolean;
  selectedTodo: Todo;
}

@Module({ dynamic: true, store, name: 'todo-list' })
class TodoList extends VuexModule implements TodoListState {
  public todos: Todo[] = [];

  public watched = false;

  public selectedTodo: Todo = {
    id: '',
    title: '',
    content: '',
    person: '',
    status: '',
    due: ''
  };

  public selectableStates = ['ongoing', 'complete', 'overdue'];

  // 返回当前用户的所有待办事项。
  public get myTodoList() {
    return (username: string): Todo[] => {
      return this.todos.filter((todo: Todo) => {
        console.debug(todo);
        return todo.person === username;
      });
    };
  }

  // 增加、修改、删除待办事项。
  @Mutation
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
        break;
      }
      case 'modified': {
        this.todos.splice(oldIndex, 1);
        const todo: Todo = doc.data() as Todo;
        this.todos.splice(newIndex, 0, { ...todo, id: doc.id });
        break;
      }
      case 'removed': {
        this.todos.splice(oldIndex, 1);
        break;
      }
    }
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

  @Mutation
  private SORT_BY(prop: string): void {
    switch (prop) {
      case 'title':
        this.todos.sort((a, b) => (a.title < b.title ? -1 : 1));
        break;
      case 'person':
        this.todos.sort((a, b) => (a.person < b.person ? -1 : 1));
        break;
    }
  }

  @Action
  public sort_by(prop: string) {
    this.SORT_BY(prop);
  }

  // 实时更新 TodoList，只能执行一次。
  @Action
  watcher(): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
      if (!this.watched) {
        this.SET_WATCHED(true);
        // TODO 抽象操作数据接口
        // unsubscribe can be called to stop listening for changes
        projectsCollection.onSnapshot(
          (ref) => {
            ref.docChanges().forEach((change) => {
              const { newIndex, oldIndex, doc, type } = change;
              this.CHANGE_TODO({ newIndex, oldIndex, doc, type });
            });
            resolve();
          },
          (err) => {
            console.log(err);
            reject(err);
          }
        );
      }
    });
  }

  // 新增一个待办事项。
  @Action
  add(todo: Todo): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
      projectsCollection
        .add(todo)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  // 更新一个待办事项。
  @Action
  update(todo: Todo): Promise<unknown> {
    const id = todo.id;
    delete todo.id;
    return new Promise((resolve, reject) => {
      projectsCollection
        .doc(id)
        .update(todo)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  // 删除多个待办事项。
  @Action
  deletes(ids: string[]): Promise<unknown> {
    const errors: unknown[] = [];
    for (const id of ids) {
      projectsCollection
        .doc(id)
        .delete()
        .catch((err) => {
          console.log(err);
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
