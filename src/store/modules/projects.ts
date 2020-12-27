import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import { projectsCollection } from '@/plugins/firebase';
import store from '@/store';
import firebase from 'firebase/app';

export interface Project {
  id?: string;
  title: string;
  content: string;
  due: null | string;
  person: string;
  status: string;
}

export interface ProjectsState {
  data: Project[];
  watched: boolean;
  selectedProject: Project;
}

@Module({ dynamic: true, store, name: 'projects' })
class Projects extends VuexModule implements ProjectsState {
  data: Project[] = [];

  watched = false;

  selectedProject: Project = {
    id: '',
    title: '',
    content: '',
    person: '',
    status: '',
    due: ''
  };

  selectableStates = ['ongoing', 'complete', 'overdue'];

  get myProjects() {
    return (username: string): Project[] => {
      return this.data.filter((project: Project) => {
        return project.person === username;
      });
    };
  }

  @Mutation
  sortBy(prop: string): void {
    switch (prop) {
      case 'title':
        this.data.sort((a, b) => (a.title < b.title ? -1 : 1));
        break;
      case 'person':
        this.data.sort((a, b) => (a.person < b.person ? -1 : 1));
        break;
    }
  }

  // 增删改 projects
  @Mutation
  changeProject(change: {
    newIndex: number;
    oldIndex: number;
    doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
    type: string;
  }) {
    const { newIndex, oldIndex, doc, type } = change;
    if (type === 'added') {
      const project: Project = doc.data() as Project;
      this.data.splice(newIndex, 0, { ...project, id: doc.id });
    } else if (type === 'modified') {
      this.data.splice(oldIndex, 1);
      const project: Project = doc.data() as Project;
      this.data.splice(newIndex, 0, { ...project, id: doc.id });
    } else if (type === 'removed') {
      this.data.splice(oldIndex, 1);
    }
  }

  @Mutation
  public beginWatching(): void {
    this.watched = true;
  }

  @Mutation
  public setSelectedProject(id: string): void {
    for (const p of this.data) {
      if (p.id === id) {
        this.selectedProject = p;
      }
    }
  }

  // 实时更新 projects，只允许执行一次
  @Action
  watcher(): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
      if (!this.watched) {
        this.beginWatching();
        // TODO 抽象操作数据接口
        // unsubscribe can be called to stop listening for changes
        projectsCollection.onSnapshot(
          (ref) => {
            ref.docChanges().forEach((change) => {
              const { newIndex, oldIndex, doc, type } = change;
              this.changeProject({ newIndex, oldIndex, doc, type });
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

  // 新增项目
  @Action
  addProject(project: Project): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
      projectsCollection
        .add(project)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  @Action
  removeProjects(ids: string[]): Promise<unknown> {
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

  @Action
  updateProject(project: Project): Promise<unknown> {
    const id = project.id;
    delete project.id;
    return new Promise((resolve, reject) => {
      projectsCollection
        .doc(id)
        .update(project)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

export const ProjectModule = getModule(Projects);
