<template>
  <v-app :style="{ background: this.$vuetify.theme.themes[theme].background }">
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { setInterceptor } from '@/plugins/axios';

const auth = namespace('auth');

@Component
export default class App extends Vue {
  get theme(): string {
    return this.$vuetify.theme.dark ? 'dark' : 'light';
  }

  @auth.Action
  loadToken!: () => void;

  created(): void {
    this.loadToken();
    setInterceptor();
  }
}
</script>
