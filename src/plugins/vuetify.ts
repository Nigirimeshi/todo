import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#20B2AA',
        secondary: '#424242',
        accent: '#82B1FF',
        info: '#2196F3',
        success: '#20B2AA',
        warning: '#FFA500',
        error: '#FF6347',
        background: colors.grey.lighten4
      },
      dark: {
        primary: '#20B2AA'
      }
    }
  }
};

export default new Vuetify(opts);
