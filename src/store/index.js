/*
 * 组装模块并导出 store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import projects from '@/store/modules/projects'
import links from "@/store/modules/links";
import profile from "@/store/modules/profile";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// global state
const state = {
  snackbar: false,
  drawer: true,
}

// global mutations
const mutations = {
  showSnackbar: (state) => {
    state.snackbar = true;
  },
  closeSnackbar: (state) => {
    state.snackbar = false;
  },
  switchDrawer: (state) => {
    state.drawer = ! state.drawer;
  },
}

export default new Vuex.Store({
  modules: {
    projects,
    links,
    profile,
  },
  strict: debug,
  state,
  mutations,
})
