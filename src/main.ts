import Vue from 'vue';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import store from '@/store';
import axios from '@/plugins/axios';
import { auth } from '@/plugins/firebase';
import { UserModule } from '@/store/modules/user';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

auth.onAuthStateChanged((user) => {
  UserModule.setUser(user);
  if (user) {
    UserModule.setSignedIn(true);
  } else {
    UserModule.setSignedIn(false);
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
