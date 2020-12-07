const state = {
  links: {
    dashboard: {
      text: 'Dashboard',
      icon: 'mdi-view-dashboard',
      route: '/'
    },
    folder: {
      text: 'Folder',
      icon: 'mdi-folder',
      route: '/projects'
    },
    person: {
      text: 'Person',
      icon: 'mdi-account',
      route: '/team'
    },
    login: {
      text: 'Login',
      icon: 'mdi-login-variant',
      route: '/login'
    },
    signup: {
      text: 'Signup',
      icon: 'mdi-account-plus',
      route: '/signup'
    }
  }
};

export default {
  namespaced: true,
  state
};
