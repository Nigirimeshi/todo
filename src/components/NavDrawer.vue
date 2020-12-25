<template>
  <!-- 侧边栏导航 -->
  <v-navigation-drawer v-model="drawerModel" app color="primary">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <!-- 头像和名字 -->
          <v-avatar class="ma-2" size="100">
            <v-img :src="avatar"></v-img>
          </v-avatar>
          <p class="white--text text-center mb-0">{{ name }}</p>
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
import { namespace } from 'vuex-class';

import DialogForAddProject from '@/components/DialogForAddProject.vue';

const nav = namespace('nav');
const links = namespace('links');
const profile = namespace('profile');

@Component({
  components: {
    DialogForAddProject
  }
})
export default class NavDrawer extends Vue {
  public selectedLink = 0;

  @nav.State
  public drawer!: boolean;

  @links.State
  public links!: any;

  @profile.State
  public name!: string;

  @profile.State
  public avatar!: string;

  get drawerModel(): boolean {
    return this.drawer;
  }

  set drawerModel(newVal: boolean) {
    return;
  }
}
</script>
