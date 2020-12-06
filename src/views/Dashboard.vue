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
        
        <!-- 删除按钮 -->
        <v-col sm="3" md="2" v-if="selected.length >= 1">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="error--text"
                small
                depressed
                v-bind="attrs"
                v-on="on"
                @click="removeSelectedProjects"
              >
                <v-icon small left>mdi-trash-can-outline</v-icon>
                <span class="text-lowercase">Delete</span>
              </v-btn>
            </template>
            <span>Delete selected projects</span>
          </v-tooltip>
        </v-col>
        
        <!-- 编辑按钮 -->
        <v-col sm="3" md="2" v-if="selected.length == 1">
          <DialogForEditProject/>
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
                <template v-slot:default="{  }">
                  <v-list-item-content>
                    <v-row>
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
              <v-divider
                v-if="index < projects.length - 1"
                :key="index"
              ></v-divider>
            </div>
          
          </template>
        </v-list-item-group>
      </v-list>
    
    </v-container>
  </v-container>
</template>

<script>
import Nav from "@/components/Nav";
import DialogForEditProject from "@/components/DialogForEditProject";
import {mapState, mapMutations, mapActions} from "vuex"

export default {
  components: {
    Nav,
    DialogForEditProject,
  },
  
  data: () => ({
    breadcrumbs: [
      {
        text: 'Dashboard',
        disabled: true,
        href: '/',
      },
    ],
    selected: [],
    dialog: true,
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
      'setSelectedProject',
    ]),
    ...mapActions('projects', [
      'watcher',
      'removeProjects',
    ]),
    
    removeSelectedProjects() {
      this.removeProjects(this.selected)
      this.selected = []
    },
    
    selectedChange() {
      if (this.selected.length === 1) {
        this.setSelectedProject(this.selected[0])
      }
    },
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
