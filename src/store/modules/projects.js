import {projectsCollection} from "@/plugins/firebase";

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
}

// getters
const getters = {
  myProjects: (state) => (name) => {
    return state.projects.filter(project => {
      return project.person === name;
    })
  }
}

// mutations
const mutations = {
  // 按属性排序
  sortBy: (state, {prop}) => {
    state.projects.sort(((a, b) => a[prop] < b[prop] ? -1 : 1))
  },
  
  // 增删改 projects
  changeProject: (state, {newIndex, oldIndex, doc, type}) => {
    if (type === 'added') {
      state.projects.splice(newIndex, 0, {...doc.data(), id: doc.id})
    } else if (type === 'modified') {
      // remove the old one first
      state.projects.splice(oldIndex, 1)
      state.projects.splice(newIndex, 0, {...doc.data(), id: doc.id})
    } else if (type === 'removed') {
      state.projects.splice(oldIndex, 1)
    }
  },
  
  beginWatching: (state) => {
    state.watched = true;
  }
}

// actions
const actions = {
  // 实时更新 projects，只允许执行一次
  watcher({commit}) {
    if (!state.watched) {
      commit('beginWatching')
      // TODO 抽象操作数据接口
      // unsubscribe can be called to stop listening for changes
      projectsCollection.onSnapshot(ref => {
        ref.docChanges().forEach(change => {
          const {newIndex, oldIndex, doc, type} = change
          commit('changeProject', {newIndex, oldIndex, doc, type})
        })
      })
    }
  },
  
  // 新增项目
  // eslint-disable-next-line no-unused-vars
  addProject({commit}, project) {
    return new Promise((resolve, reject) => {
      projectsCollection.add(project).then(() => {
        resolve()
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}