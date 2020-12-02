<template>
  <v-app-bar
    flat
    app
  >
    <!-- 控制侧边栏弹出的按钮 -->
    <v-app-bar-nav-icon
      class="grey--text"
      @click.stop="switchDrawer"
    ></v-app-bar-nav-icon>
    
    <!-- LOGO -->
    <v-toolbar-title class="grey--text">
      <span>Todo</span>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <!-- 切换黑暗主题 -->
    <v-switch
      v-model="$vuetify.theme.dark"
      inset
      hide-details
    ></v-switch>
    
    <!-- 下拉菜单 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          class="grey--text"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      
      <v-list class="py-0">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-title class="grey--text">{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    
    <!-- 注销 -->
    <v-btn
      depressed
      right
      class="grey--text"
    >
      <span>Logout</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import {mapState, mapMutations} from "vuex"

export default {
  computed: {
    ...mapState('links', [
      'links',
    ]),
  },
  methods: {
    ...mapMutations([
      'switchDrawer',
    ]),
  },
}
</script>