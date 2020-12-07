import { projectsCollection } from '@/plugins/firebase';

// const ProjectStatus = {
//   ONGOING: 'ongoing',
//   COMPLETE: 'complete',
//   OVERDUE: 'overdue',
// }

// initial state
const state = {
  projects: [
    /*
     {
     id,
     title,
     content,
     person,
     status,
     }
     */
  ],
  watched: false,
  selectedProject: {}
};

// getters
const getters = {
  myProjects: (state) => (name) => {
    return state.projects.filter((project) => {
      return project.person === name;
    });
  },
  
  projectStatus: () => {
    return ['ongoing', 'complete', 'overdue'];
  }
};

// mutations
const mutations = {
  // 按属性排序
  sortBy: (state, { prop }) => {
    state.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
  },
  
  // 增删改 projects
  changeProject: (state, { newIndex, oldIndex, doc, type }) => {
    if (type === 'added') {
      state.projects.splice(newIndex, 0, { ...doc.data(), id: doc.id });
    } else if (type === 'modified') {
      // remove the old one first
      state.projects.splice(oldIndex, 1);
      state.projects.splice(newIndex, 0, { ...doc.data(), id: doc.id });
    } else if (type === 'removed') {
      state.projects.splice(oldIndex, 1);
    }
  },

  beginWatching: (state) => {
    state.watched = true;
  },
  
  setSelectedProject: (state, id) => {
    for (let p of state.projects) {
      if (p.id === id) {
        state.selectedProject = p;
      }
    }
  }
};

// actions
const actions = {
  // 实时更新 projects，只允许执行一次
  watcher({ commit }) {
    return new Promise((resolve, reject) => {
      if (!state.watched) {
        commit('beginWatching');
        // TODO 抽象操作数据接口
        // unsubscribe can be called to stop listening for changes
        projectsCollection.onSnapshot(
          (ref) => {
            ref.docChanges().forEach((change) => {
              const { newIndex, oldIndex, doc, type } = change;
              commit('changeProject', { newIndex, oldIndex, doc, type });
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
  },
  
  // 新增项目
  // eslint-disable-next-line no-unused-vars
  addProject({ commit }, project) {
    return new Promise((resolve, reject) => {
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
  },
  
  // eslint-disable-next-line no-unused-vars
  removeProjects({ commit }, ids) {
    let errors = [];
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
  },
  
  // eslint-disable-next-line no-unused-vars
  updateProject({ commit }, project) {
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
