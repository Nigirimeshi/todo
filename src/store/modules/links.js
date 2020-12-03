const state = {
  links: [
    {text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/'},
    {text: 'Folder', icon: 'mdi-folder', route: '/projects'},
    {text: 'Person', icon: 'mdi-account', route: '/team'},
    {text: 'Login', icon: 'mdi-account', route: '/login'},
  ],
}

export default {
  namespaced: true,
  state,
}