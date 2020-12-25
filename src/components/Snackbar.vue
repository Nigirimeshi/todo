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
import { namespace } from 'vuex-class';

const snackbar = namespace('snackbar');

@Component
export default class Snackbar extends Vue {
  @snackbar.State
  visibility!: boolean;

  @snackbar.State
  text!: string;

  @snackbar.Mutation
  closeSnackbar!: () => void;
}
</script>
