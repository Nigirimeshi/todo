<template>
  <v-container class="px-4">
    <Nav />

    <v-breadcrumbs :items="breadcrumbs" class="pa-0">
      <template #item="{ item }">
        <v-breadcrumbs-item
          :disabled="item.disabled"
          :href="item.href"
          class="grey--text subtitle-1"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-container class="my-5">
      <!-- 成员介绍卡片 -->
      <v-row>
        <v-col
          v-for="person in team"
          :key="person.name"
          lg="3"
          md="4"
          sm="6"
          xl="2"
        >
          <v-card class="text-center pt-4" flat>
            <v-avatar class="grey lighten-2" rounded="circle" size="100">
              <v-img :src="person.avatar"></v-img>
            </v-avatar>

            <v-card-text>
              <div>{{ person.name }}</div>
              <div>{{ person.role }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn class="grey--text" depressed>
                <v-icon small left>mdi-message</v-icon>
                <span class="text-capitalize">Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';

@Component({
  components: {
    Nav
  }
})
export default class Team extends Vue {
  breadcrumbs = [
    {
      text: 'Team',
      disabled: true,
      href: '/team'
    }
  ];
  team = [
    { name: 'Tom', role: 'Web developer', avatar: '/avatar01.jpg' },
    { name: 'Jack', role: 'Graphic designer', avatar: '/avatar02.jpg' },
    { name: 'Yang', role: 'Web developer', avatar: '/avatar03.jpg' },
    { name: 'Rick', role: 'Social media maverick', avatar: '/avatar04.jpg' }
  ];
}
</script>
