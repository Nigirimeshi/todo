<template>
  <v-card>
    <Navbar />
    <NavDrawer />
    <Snackbar />
  </v-card>
</template>

<script>
import Navbar from '@/components/Navbar';
import NavDrawer from '@/components/NavDrawer';
import Snackbar from '@/components/Snackbar';

export default {
  components: {
    Navbar,
    NavDrawer,
    Snackbar
  }
};
</script>
