<template>
  <!-- 消息条 -->
  <v-snackbar
    v-model="snackbar"
    top
    timeout="3000"
  >
    {{ title }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        @click="closeSnackbar"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {mapMutations} from "vuex"

export default {
  props: ['title'],
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(value) {
        return value;
      }
    },
  },
  methods: {
    ...mapMutations([
      'closeSnackbar',
    ]),
  },
}
</script>