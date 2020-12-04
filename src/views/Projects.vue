<template>
  <v-container class="px-4">
    <Nav/>
    
    <v-breadcrumbs :items="breadcrumbs" class="pa-0">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :href="item.href"
          :disabled="item.disabled" class="grey--text subtitle-1"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    
    <v-container class="my-5">
      <!-- 拓展面板 -->
      <v-expansion-panels>
        <v-expansion-panel
          v-for="project in myProjects(profile.name)"
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
  </v-container>
</template>

<script>
import Nav from "@/components/Nav";
import {mapState, mapGetters, mapActions} from "vuex"

export default {
  components: {
    Nav,
  },
  
  data: () => ({
    breadcrumbs: [
      {
        text: 'Projects',
        disabled: true,
        href: '/projects',
      },
    ],
  }),
  
  computed: {
    ...mapState('profile', [
      'profile',
    ]),
    ...mapGetters('projects', [
      'myProjects'
    ]),
  },
  
  methods: {
    ...mapActions('projects', [
      'watcher',
    ])
  },
  
  created() {
    // 实时更新数据。
    this.watcher();
  },
}
</script>