<template>
  <v-card>
    <Navbar />
    <NavDrawer />
    <Snackbar />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Navbar from '@/components/Nav/Navbar.vue';
import NavDrawer from '@/components/Nav/NavDrawer.vue';
import Snackbar from '@/components/Snackbar.vue';

@Component({
  components: {
    Navbar,
    NavDrawer,
    Snackbar
  }
})
export default class App extends Vue {}
</script>
