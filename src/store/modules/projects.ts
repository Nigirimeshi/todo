import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators';
import { projectsCollection } from '@/plugins/firebase';
import store from '@/store';

export interface Project {
  id?: string;
  title: string;
  content: string;
  due: null | string;
  person: string;
  status: string;
}

export interface ProjectsState {
  projects: Project[];
  watched: boolean;
  selectedProject: Project;
}

@Module({ dynamic: true, store, name: 'projects' })
class Projects extends VuexModule implements ProjectsState {
  projects: Project[] = [];

  watched = false;

  selectedProject: Project = {
    content: '',
    id: '',
    person: '',
    status: '',
    title: '',
    due: ''
  };

  get myProjects() {
    return (name: string): Project[] => {
      return this.projects.filter((project: Project) => {
        return project.person === name;
      });
    };
  }

  get getAllStates(): string[] {
    return ['ongoing', 'complete', 'overdue'];
  }

  @Mutation
  sortBy(prop: string): void {
    switch (prop) {
      case 'title':
        this.projects.sort((a, b) => (a.title < b.title ? -1 : 1));
        break;
      case 'person':
        this.projects.sort((a, b) => (a.person < b.person ? -1 : 1));
        break;
    }
  }

  // 增删改 projects
  @Mutation
  changeProject(
    newIndex: number,
    oldIndex: number,
    doc: any, // FIXME 指定类型
    type: string
  ): void {
    if (type === 'added') {
      this.projects.splice(newIndex, 0, { ...doc.data(), id: doc.id });
    } else if (type === 'modified') {
      // remove the old one first
      this.projects.splice(oldIndex, 1);
      this.projects.splice(newIndex, 0, { ...doc.data(), id: doc.id });
    } else if (type === 'removed') {
      this.projects.splice(oldIndex, 1);
    }
  }

  @Mutation
  public beginWatching(): void {
    this.watched = true;
  }

  @Mutation
  public setSelectedProject(id: string): void {
    for (const p of this.projects) {
      if (p.id === id) {
        this.selectedProject = p;
      }
    }
  }

  // 实时更新 projects，只允许执行一次
  @Action({ rawError: true })
  watcher(): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
      if (!this.watched) {
        this.context.commit('beginWatching');
        // TODO 抽象操作数据接口
        // unsubscribe can be called to stop listening for changes
        projectsCollection.onSnapshot(
          (ref) => {
            ref.docChanges().forEach((change) => {
              const { newIndex, oldIndex, doc, type } = change;
              this.context.commit('changeProject', {
                newIndex,
                oldIndex,
                doc,
                type
              });
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
