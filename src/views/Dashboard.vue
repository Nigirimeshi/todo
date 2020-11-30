<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    
    <v-container class="my-5">
      <v-row>
        <!-- 按标题排序 -->
        <v-col sm="3" md="2">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                depressed
                class="grey--text"
                @click="sortBy('title')"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small left>mdi-folder</v-icon>
                <span class="text-lowercase">By project</span>
              </v-btn>
            </template>
            <span>Sort projects by project name</span>
          </v-tooltip>
        </v-col>
        <!-- 按人排序 -->
        <v-col sm="3" md="2">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                depressed
                class="grey--text"
                @click="sortBy('person')"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small left>mdi-account</v-icon>
                <span class="text-lowercase">By person</span>
              </v-btn>
            </template>
            <span>Sort projects by person</span>
          </v-tooltip>
        </v-col>
      </v-row>
      
      <!-- 项目列表 -->
      <v-card
        flat
        v-for="project in projects"
        :key="project.id"
      >
        <v-row no-gutters :class="`pa-3 project ${project.status}`">
          <v-col sm="12" md="6">
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-col>
          <v-col sm="4" md="2">
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-col>
          <v-col sm="4" md="2">
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-col>
          <v-col sm="4" md="2">
            <div class="float-right">
              <v-chip
                small
                :color="chipColor(project.status)"
                class="caption white--text"
              >
                {{ project.status }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    
    </v-container>
  </div>
</template>

<script>
import {watchChanges } from "@/plugins/firebase";

export default {
  data() {
    return {
      projects: [],
      projectsIndex: new Map(),
    }
  },
  methods: {
    // 根据状态显示颜色。
    chipColor: function (status) {
      switch (status) {
        case 'complete':
          return '#20B2AA'
        case 'ongoing':
          return '#FFA500'
        case 'overdue':
          return '#FF6347'
      }
    },
    sortBy: function (prop) {
      this.projects.sort(((a, b) => a[prop] < b[prop] ? -1 : 1))
    },
  },
  created() {
    // 实时更新数据。
    // TODO 将 firebase 相关操作抽象成接口。
    watchChanges('projects', this.projects)
  },
}
</script>

<style>
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
