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
      <v-row>
        <!-- 按标题排序 -->
        <v-col sm="3" md="2">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                small
                depressed
                v-bind="attrs"
                @click="sortBy('title')"
                v-on="on"
                class="grey--text"
              >
                <v-icon left small> mdi-folder</v-icon>
                <span class="text-lowercase">By project</span>
              </v-btn>
            </template>
            <span>Sort projects by project name</span>
          </v-tooltip>
        </v-col>

        <!-- 按人排序 -->
        <v-col sm="3" md="2">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                small
                depressed
                v-bind="attrs"
                @click="sortBy('person')"
                v-on="on"
                class="grey--text"
              >
                <v-icon left small> mdi-account</v-icon>
                <span class="text-lowercase">By person</span>
              </v-btn>
            </template>
            <span>Sort projects by person</span>
          </v-tooltip>
        </v-col>

        <!-- 删除按钮 -->
        <v-col sm="3" md="2" v-if="selected.length >= 1">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                small
                depressed
                v-on="on"
                class="error--text"
                @click="removeSelectedProjects"
              >
                <v-icon left small> mdi-trash-can-outline</v-icon>
                <span class="text-lowercase">Delete</span>
              </v-btn>
            </template>
            <span>Delete selected projects</span>
          </v-tooltip>
        </v-col>

        <!-- 编辑按钮 -->
        <v-col v-if="selected.length === 1" md="2" sm="3">
          <DialogForEditProject />
        </v-col>
      </v-row>

      <!-- 项目列表 -->
      <v-list dense class="py-0" two-line>
        <v-list-item-group
          v-model="selected"
          active-class="primary--text"
          multiple
          @change="selectedChange"
        >
          <template v-for="(project, index) in projects">
            <div :class="`project ${project.status}`" :key="project.id">
              <v-list-item :value="project.id">
                <template #default="{}">
                  <v-list-item-content>
                    <v-row>
                      <v-col md="6" sm="12">
                        <div class="caption grey--text">Project title</div>
                        <div>{{ project.title }}</div>
                      </v-col>
                      <v-col md="2" sm="4">
                        <div class="caption grey--text">Person</div>
                        <div>{{ project.person }}</div>
                      </v-col>
                      <v-col md="2" sm="4">
                        <div class="caption grey--text">Due by</div>
                        <div>{{ project.due }}</div>
                      </v-col>
                      <v-col
                        class="d-flex align-center justify-end"
                        md="2"
                        sm="4"
                      >
                        <v-chip
                          :color="chipColor(project.status)"
                          class="caption white--text"
                        >
                          {{ project.status }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-divider v-if="index < projects.length - 1" :key="index" />
            </div>
          </template>
        </v-list-item-group>
      </v-list>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Project, ProjectModule } from '@/store/modules/projects';

import DialogForEditProject from '@/components/DialogForEditProject.vue';
import Nav from '@/components/Nav.vue';

@Component({
  components: {
    Nav,
    DialogForEditProject
  }
})
export default class Dashboard extends Vue {
  private breadcrumbs = [
    {
      text: 'Dashboard',
      disabled: true,
      href: '/'
    }
  ];

  private selected: string[] = [];

  chipColor(status: string): string {
    switch (status) {
      case 'complete':
        return '#20B2AA';
      case 'ongoing':
        return '#FFA500';
      case 'overdue':
        return '#FF6347';
      default:
        return '#FFFFFF';
    }
  }

  get projects(): Project[] {
    return ProjectModule.data;
  }

  private sortBy(prop: string): void {
    ProjectModule.sortBy(prop);
  }

  private removeSelectedProjects(): void {
    ProjectModule.removeProjects(this.selected);
    this.selected = [];
  }

  private selectedChange(): void {
    if (this.selected.length === 1) {
      ProjectModule.setSelectedProject(this.selected[0]);
    }
  }

  created(): void {
    ProjectModule.watcher();
  }
}
</script>

<style scoped>
.project.complete {
  border-left: 4px solid lightseagreen;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}
</style>
