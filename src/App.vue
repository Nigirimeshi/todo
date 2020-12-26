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
import { setInterceptor } from '@/plugins/axios';

import { AuthModule } from '@/store/modules/auth';

@Component
export default class App extends Vue {
  get theme(): string {
    return this.$vuetify.theme.dark ? 'dark' : 'light';
  }

  created(): void {
    AuthModule.loadToken();
    setInterceptor();
  }
}
</script>
