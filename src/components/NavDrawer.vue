<template>
  <!-- 侧边栏导航 -->
  <v-navigation-drawer v-model="drawer" app color="primary">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <!-- 头像和名字 -->
          <v-avatar class="ma-2" size="100">
            <v-img :src="avatar"></v-img>
          </v-avatar>
          <p class="white--text text-center mb-0">{{ username }}</p>
        </v-col>

        <v-col cols="auto">
          <!-- DialogForAddProject.vue -->
          <DialogForAddProject />
        </v-col>
      </v-row>
    </v-container>

    <!-- 菜单项 -->
    <v-list>
      <v-list-item-group v-model="selectedLink" color="white">
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
            <v-list-item-title
              class="white--text"
              v-text="link.text"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import DialogForAddProject from '@/components/DialogForAddProject.vue';

import { NavModule } from '@/store/modules/nav';
import { Link, LinksModule } from '@/store/modules/links';
import { UserModule } from '@/store/modules/user';

@Component({
  components: {
    DialogForAddProject
  }
})
export default class NavDrawer extends Vue {
  private selectedLink = 0;

  get drawer(): boolean {
    return NavModule.drawer;
  }

  set drawer(newVal: boolean) {
    return;
  }

  get links(): Link[] {
    return LinksModule.data;
  }

  get username(): string {
    return UserModule.name;
  }

  get avatar(): string {
    return UserModule.avatar;
  }
}
</script>
