<template>
  <!-- 消息条 -->
  <v-snackbar v-model='snackbarVisibility' timeout='2000' top>
    {{ snackbarText }}
    <template #action='{ attrs }'>
      <v-btn v-bind='attrs' @click='closeSnackbar'> Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['closeSnackbar'])
  },
  // TODO 实现失败，警告，成功通用提示条组件
  computed: {
    snackbarVisibility: {
      get() {
        return this.$store.state.snackbar.visibility;
      },
      set() {
        this.closeSnackbar();
      }
    },
    snackbarText() {
      return this.$store.state.snackbar.text;
    }
  }
};
</script>
