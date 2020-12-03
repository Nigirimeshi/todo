/*
 * 组装模块并导出 store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import projects from '@/store/modules/projects'
import links from "@/store/modules/links";
import profile from "@/store/modules/profile";
import auth from "@/store/modules/auth";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// global state
const state = {
  snackbar: {
    visibility: false,
    text: '',
  },
  drawer: true,
}

// global mutations
const mutations = {
  showSnackbar: (state, {text}) => {
    state.snackbar.visibility = true;
    state.snackbar.text = text;
  },
  closeSnackbar: (state) => {
    state.snackbar.visibility = false;
    state.snackbar.text = '';
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
    auth,
  },
  strict: debug,
  state,
  mutations,
})
