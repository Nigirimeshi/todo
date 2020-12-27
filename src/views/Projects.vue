<template>
  <v-container class="px-4">
    <Nav />

    <v-breadcrumbs :items="breadcrumbs" class="pa-0">
      <template #item="{ item }">
        <v-breadcrumbs-item
          :disabled="item.disabled"
          :href="item.href"
          class="grey--text subtitle-1"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-container class="my-5">
      <!-- 拓展面板 -->
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="project in myProjects" :key="project.id">
          <v-expansion-panel-header
            >{{ project.title }}
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div>due by {{ project.due }}</div>
            <p>{{ project.content }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Nav from '@/components/Nav.vue';

import { UserModule } from '@/store/modules/user';
import { Project, ProjectModule } from '@/store/modules/projects';

@Component({
  components: {
    Nav
  }
})
export default class PP extends Vue {
  private breadcrumbs = [
    {
      text: 'Projects',
      disabled: true,
      href: '/projects'
    }
  ];

  get username(): string {
    return UserModule.name;
  }

  private myProjects(): Project[] {
    return ProjectModule.myProjects(this.username);
  }

  created(): void {
    ProjectModule.watcher();
  }
}
</script>
