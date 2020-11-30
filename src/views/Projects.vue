<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Projects</h1>
    
    <v-container class="my-5">
      <!-- 拓展面板 -->
      <v-expansion-panels>
        <v-expansion-panel
          v-for="project in myProjects"
          :key="project.title"
        >
          <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>due by {{ project.due }}</div>
            <p>{{ project.content }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    
    </v-container>
  </div>
</template>

<script>
import { watchChanges } from "@/plugins/firebase";

export default {
  data() {
    return {
      projects: [],
      user: {
        'name': 'Yang',
      }
    }
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person === this.user.name;
      })
    }
  },
  created() {
    // 实时更新数据。
    // TODO 将 firebase 相关操作抽象成接口。
    watchChanges('projects', this.projects)
  },
}
</script>