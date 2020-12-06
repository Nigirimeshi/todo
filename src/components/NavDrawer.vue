<template>
  <!-- 侧边栏导航 -->
  <v-navigation-drawer
    app
    v-model="drawer"
    color="primary"
  >
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <!-- 头像和名字 -->
          <v-avatar size="100" class="ma-2">
            <v-img :src="profile.avatar"></v-img>
          </v-avatar>
          <p class="white--text text-center mb-0">{{ profile.name }}</p>
        </v-col>
        
        <v-col cols="auto">
          <!-- DialogForAddProject.vue -->
          <DialogForAddProject/>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- 菜单项 -->
    <v-list>
      <v-list-item-group
        v-model="selectedLink"
        color="white"
      >
        <v-list-item
          v-for="(link, name) in links"
          :key="name"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon color="white" v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="link.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import DialogForAddProject from "@/components/DialogForAddProject";
import {mapState} from "vuex"

export default {
  components: {
    DialogForAddProject,
  },
  
  data() {
    return {
      selectedLink: 0,
    }
  },
  
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        return value;
      },
    },
    ...mapState('links', [
      'links',
    ]),
    ...mapState('profile', [
      'profile',
    ]),
  },
}
</script>