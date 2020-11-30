<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <div class="grey lighten-4">
      <Navbar/>
      <v-main>
        <v-container fluid class="px-4">
          <router-view></router-view>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  data: () => ({
    //
  }),
};
</script>