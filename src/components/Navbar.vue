<template>
  <v-app-bar app flat>
    <!-- 控制侧边栏弹出的按钮 -->
    <v-app-bar-nav-icon
      class='grey--text'
      @click.stop='switchDrawer'
    ></v-app-bar-nav-icon>
  
    <!-- LOGO -->
    <v-toolbar-title class='grey--text'>
      <span>Todo</span>
    </v-toolbar-title>
  
    <v-spacer></v-spacer>
  
    <!-- 切换黑暗主题 -->
    <v-switch v-model='$vuetify.theme.dark' hide-details inset></v-switch>
  
    <!-- 下拉菜单 -->
    <v-menu offset-y>
      <template #activator='{ on, attrs }'>
        <v-btn v-bind='attrs' v-on='on' class='grey--text' depressed>
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
    
      <v-list class='py-0'>
        <v-list-item
          v-for='(link, name) in links'
          :key='name'
          router
          :to='link.route'
        >
          <v-list-item-title class='grey--text'>{{
              link.text
            }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- 注销按钮 -->
    <v-btn class='grey--text' depressed right @click='logout'>
      <span>Logout</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('links', ['links'])
  },
  
  methods: {
    ...mapMutations(['switchDrawer']),
    
    ...mapActions('auth', ['logout'])
  }
};
</script>
