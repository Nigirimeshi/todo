<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <div class="grey lighten-4 fill-height">
      <Nav/>
      <v-main>
        <v-container fluid class="px-4">
          <router-view></router-view>
        </v-container>
      </v-main>
    </div>
    
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  name: 'App',
  components: {
    Nav,
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  data: () => ({
    drawer: false,
  }),
};
</script>