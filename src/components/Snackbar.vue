<template>
  <!-- 消息条 -->
  <v-snackbar v-model="visibility" timeout="2000" top>
    {{ text }}
    <template #action="{ attrs }">
      <v-btn v-bind="attrs" @click="closeSnackbar"> Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { SnackbarModule } from '@/store/modules/snackbar';

@Component
export default class Snackbar extends Vue {
  get visibility(): boolean {
    return SnackbarModule.visibility;
  }

  set visibility(newVal: boolean) {
    if (newVal) {
      SnackbarModule.showSnackbar('');
    } else {
      SnackbarModule.closeSnackbar();
    }
    return;
  }

  get text(): string {
    return SnackbarModule.text;
  }

  private closeSnackbar() {
    SnackbarModule.closeSnackbar();
  }
}
</script>
