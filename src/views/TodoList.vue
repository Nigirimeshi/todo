<template>
  <v-container class="px-4">
    <Nav />

    <v-breadcrumbs :items="breadcrumbs" class="pa-0">
      <template #item="{ item }">
        <v-breadcrumbs-item :disabled="item.disabled" :href="item.href" class="grey--text subtitle-1">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-container class="my-5">
      <!-- 拓展面板 -->
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="todo in myTodoList" :key="todo.id">
          <v-expansion-panel-header>{{ todo.title }} </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div>due by {{ todo.due }}</div>
            <p>{{ todo.content }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Nav from '@/components/Nav.vue';

import { UserModule } from '@/store/modules/user';
import { Todo, TodoListModule } from '@/store/modules/todo-list';

@Component({
  components: {
    Nav
  }
})
export default class TodoList extends Vue {
  private breadcrumbs = [
    {
      text: 'Todo List',
      disabled: true,
      href: '/todo-list'
    }
  ];

  get username(): string {
    return UserModule.name;
  }

  private myTodoList(): Todo[] {
    return TodoListModule.myTodoList(this.username);
  }

  created(): void {
    TodoListModule.watcher();
  }
}
</script>
