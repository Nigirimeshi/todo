const state = {
  links: [
    {text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/'},
    {text: 'Folder', icon: 'mdi-folder', route: '/projects'},
    {text: 'Person', icon: 'mdi-account', route: '/team'},
  ],
}

export default {
  namespaced: true,
  state,
}