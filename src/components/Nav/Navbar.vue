<template>
  <v-app-bar app flat>
    <!-- 控制侧边栏弹出的按钮 -->
    <v-app-bar-nav-icon class="grey--text" @click.stop="toggleSidebar"></v-app-bar-nav-icon>

    <!-- LOGO -->
    <v-toolbar-title class="grey--text">
      <span>Todo</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- 切换暗黑主题 -->
    <v-switch v-model="$vuetify.theme.dark" hide-details inset></v-switch>

    <!-- 下拉菜单 -->
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="grey--text" depressed>
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>

      <v-list class="py-0">
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-title class="grey--text">{{ link.text }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- 登录按钮 -->
    <v-btn v-if="!signedIn" class="grey--text" depressed right :to="loginURL">
      <span>Login</span>
      <v-icon right>mdi-login-variant</v-icon>
    </v-btn>

    <!-- 注册按钮 -->
    <v-btn v-if="!signedIn" class="grey--text" depressed right :to="signupURL">
      <span>Signup</span>
      <v-icon right>mdi-account-plus</v-icon>
    </v-btn>

    <!-- 注销按钮 -->
    <v-btn v-if="signedIn" class="grey--text" depressed right @click="logout">
      <span>Logout</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { AppModule } from '@/store/modules/app';
import { Link, LinksModule } from '@/store/modules/links';
import { UserModule } from '@/store/modules/user';

@Component
export default class Navbar extends Vue {
  private loginURL = '/login';
  private signupURL = '/signup';

  get links(): Link[] {
    return LinksModule.data;
  }

  get signedIn(): boolean {
    return UserModule.signedIn;
  }

  private toggleSidebar(): void {
    AppModule.toggleSidebar();
  }

  private logout(): void {
    UserModule.logout();
  }
}
</script>
