import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#20B2AA',
        // primary: colors.indigo,
        // secondary: colors.grey.darken1,
        // accent: colors.shades.black,
        // error: colors.red.accent3,
        warning: colors.orange,
        backgroundColor: colors.grey.lighten4,
      },
      dark: {
        // primary: colors.blue.black,
      },
    },
  },
});
