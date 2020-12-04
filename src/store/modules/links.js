const state = {
  links: [
    {text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/'},
    {text: 'Folder', icon: 'mdi-folder', route: '/projects'},
    {text: 'Person', icon: 'mdi-account', route: '/team'},
    {text: 'Login', icon: 'mdi-login-variant', route: '/login'},
    {text: 'Signup', icon: 'mdi-account-plus', route: '/signup'},
  ],
}

export default {
  namespaced: true,
  state,
}