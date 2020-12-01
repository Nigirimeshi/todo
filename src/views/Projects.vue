<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Projects</h1>
    
    <v-container class="my-5">
      <!-- 拓展面板 -->
      <v-expansion-panels>
        <v-expansion-panel
          v-for="project in myProjects(user.name)"
          :key="project.id"
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
import {mapGetters} from "vuex"

export default {
  data() {
    return {
      user: {
        'name': 'Yang',
      }
    }
  },
  computed: {
    ...mapGetters('projects', [
      'myProjects'
    ]),
  },
}
</script>