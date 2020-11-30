<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">Team</h1>
    
    <v-container class="my-5">
      <!-- 成员介绍卡片 -->
      <v-row>
        <v-col
          sm="6" md="4" lg="3" xl="2"
          v-for="person in team"
          :key="person.name"
        >
          <v-card flat class="text-center pt-4">
            <v-avatar
              size="100"
              rounded="circle"
              class="grey lighten-2"
            >
              <v-img :src="person.avatar"></v-img>
            </v-avatar>
            
            <v-card-text>
              <div class="black--text">{{ person.name }}</div>
              <div>{{ person.role }}</div>
            </v-card-text>
            
            <v-card-actions>
              <v-btn depressed class="grey--text" color="white">
                <v-icon small left>mdi-message</v-icon>
                <span class="text-capitalize">Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {name: 'Tom', role: 'Web developer', avatar: '/avatar01.jpg'},
        {name: 'Jack', role: 'Graphic designer', avatar: '/avatar02.jpg'},
        {name: 'Yang', role: 'Web developer', avatar: '/avatar03.jpg'},
        {name: 'Rick', role: 'Social media maverick', avatar: '/avatar04.jpg'},
      ],
    }
  },
}
</script>