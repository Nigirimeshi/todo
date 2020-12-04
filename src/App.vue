<template>
  <v-app :style="{background: this.$vuetify.theme.themes[theme].background}">
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
};
</script>