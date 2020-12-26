<template>
  <v-app-bar app flat>
    <!-- 控制侧边栏弹出的按钮 -->
    <v-app-bar-nav-icon
      class="grey--text"
      @click.stop="this.switchDrawer"
    ></v-app-bar-nav-icon>

    <!-- LOGO -->
    <v-toolbar-title class="grey--text">
      <span>Todo</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- 切换黑暗主题 -->
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
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-title class="grey--text"
            >{{ link.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- 注销按钮 -->
    <v-btn class="grey--text" depressed right @click="logout">
      <span>Logout</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { NavModule } from '@/store/modules/nav';
import { Link, LinksModule } from '@/store/modules/links';
import { AuthModule } from '@/store/modules/auth';

@Component
export default class Navbar extends Vue {
  get links(): Link[] {
    return LinksModule.data;
  }

  private static switchDrawer(): void {
    NavModule.switchDrawer();
  }

  private logout() {
    AuthModule.logout();
  }
}
</script>
