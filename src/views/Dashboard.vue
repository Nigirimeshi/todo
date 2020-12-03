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
      <v-row>
        <!-- 按标题排序 -->
        <v-col sm="3" md="2">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                depressed
                class="grey--text"
                @click="sortBy({prop: 'title'})"
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
                @click="sortBy({prop: 'person'})"
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
          <v-col sm="4" md="2" class="d-flex align-center justify-end">
            <v-chip
              small
              :color="chipColor(project.status)"
              class="caption white--text"
            >
              {{ project.status }}
            </v-chip>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    
    </v-container>
  </v-container>
</template>

<script>
import Nav from "@/components/Nav";
import {mapState, mapMutations, mapActions} from "vuex"

export default {
  components: {
    Nav,
  },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Dashboard',
        disabled: true,
        href: '/',
      },
    ],
  }),
  computed: {
    ...mapState('projects', [
        'projects',
      ]
    ),
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
    ...mapMutations('projects', [
      'sortBy',
    ]),
    ...mapActions('projects', [
      'watcher',
    ]),
  },
  created() {
    // 实时更新数据。
    this.watcher();
  },
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
