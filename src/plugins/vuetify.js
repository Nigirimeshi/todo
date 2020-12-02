import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
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
        background: colors.grey.lighten4,
      },
      dark: {
        primary: '#20B2AA',
      },
    },
  },
});
