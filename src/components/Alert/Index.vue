<template>
  <div>
    <!-- 提示条 -->
    <v-alert
      v-if="props.status === 'success'"
      dense
      dismissible
      dark
      :color="props.color"
      class="mx-auto"
      icon="mdi-check"
      :max-width="props.maxWidth"
    >
      {{ props.text }}
    </v-alert>
    <v-alert
      v-if="props.status === 'error'"
      dense
      dismissible
      dark
      :color="props.color"
      class="mx-auto"
      icon="mdi-alert-circle"
      :max-width="props.maxWidth"
    >
      {{ props.text }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface AlertComponentProp {
  status: 'success' | 'error' | '';
  color: string;
  text: string;
  maxWidth?: string;
}

@Component
export default class Alert extends Vue {
  @Prop({}) props!: AlertComponentProp;
}
</script>
