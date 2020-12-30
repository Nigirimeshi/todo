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
import { AppModule } from '@/store/modules/app';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Snackbar extends Vue {
  get visibility(): boolean {
    return AppModule.snackbar.visibility;
  }

  set visibility(newVal: boolean) {
    if (newVal) {
      AppModule.showSnackbar('');
    } else {
      AppModule.closeSnackbar();
    }
    return;
  }

  get text(): string {
    return AppModule.snackbar.text;
  }

  private closeSnackbar() {
    AppModule.closeSnackbar();
  }
}
</script>
