<template>
  <nav>
    <v-app-bar
      flat
      app
    >
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      
      <!-- LOGO -->
      <v-toolbar-title class="grey--text">
        <span>Todo</span>
        <span class="font-weight-light">Demo</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
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
    
    <!-- 侧边栏 -->
    <v-navigation-drawer
      app
      v-model="drawer"
      color="primary"
    >
      <v-container>
        <v-row justify="center" align="center">
          <!-- 头像和名字 -->
          <v-col cols="auto">
            <v-avatar size="100" class="ma-2">
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
            <p class="white--text text-center mb-0">{{ user.name }}</p>
          </v-col>
          
          <!-- 创建新项目按钮 -->
          <v-col cols="auto">
            <!-- 接收到事件时，显示消息条 -->
            <Popup @showSnackbar="snackbar = true"/>
          </v-col>
        </v-row>
      </v-container>
      
      <!-- 侧边菜单项 -->
      <v-list>
        <v-list-item-group
          v-model="selectedItem"
          color="white"
        >
          <v-list-item
            v-for="link in links"
            :key="link.text"
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
    
    <!-- 消息条 -->
    <v-snackbar
      v-model="snackbar"
      top
      timeout="3000"
    >
      Awesome! You added a new project.
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  
  </nav>
</template>

<script>
import Popup from "@/components/Popup";

export default {
  components: {
    Popup,
  },
  data() {
    return {
      drawer: false,
      snackbar: false,
      
      selectedItem: 0,
      links: [
        {text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/'},
        {text: 'Folder', icon: 'mdi-folder', route: '/projects'},
        {text: 'Person', icon: 'mdi-account', route: '/team'},
      ],
      
      user: {  // TODO 获取当前用户
        name: 'Yang',
        avatar: '/avatar03.jpg',
      }
    }
  }
}
</script>