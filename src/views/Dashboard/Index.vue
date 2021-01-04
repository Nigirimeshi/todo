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
      <v-row>
        <!-- 按标题排序 -->
        <v-col sm="3" md="2">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn small depressed v-bind="attrs" @click="sortBy('title')" v-on="on" class="grey--text">
                <v-icon left small> mdi-folder</v-icon>
                <span class="text-lowercase">By title</span>
              </v-btn>
            </template>
            <span>Sort to-do list by title</span>
          </v-tooltip>
        </v-col>

        <!-- 删除按钮 -->
        <v-col sm="3" md="2" v-if="selected.length >= 1">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" small depressed v-on="on" class="error--text" @click="deleteTodo">
                <v-icon left small> mdi-trash-can-outline</v-icon>
                <span class="text-lowercase">Delete</span>
              </v-btn>
            </template>
            <span>Delete the selected to-do list</span>
          </v-tooltip>
        </v-col>

        <!-- 编辑按钮 -->
        <v-col v-if="selected.length === 1" md="2" sm="3">
          <EditTodo />
        </v-col>
      </v-row>

      <!-- 项目列表 -->
      <v-list dense class="py-0" two-line>
        <v-list-item-group v-model="selected" active-class="primary--text" multiple @change="setSelectedTodo">
          <template v-for="(todo, index) in todoList">
            <div :class="`todo ${todo.status}`" :key="todo.id">
              <v-list-item :value="todo.id">
                <template #default="{}">
                  <v-list-item-content>
                    <v-row>
                      <v-col md="6" sm="12">
                        <div class="caption grey--text">Title</div>
                        <div>{{ todo.title }}</div>
                      </v-col>
                      <v-col md="2" sm="4">
                        <div class="caption grey--text">Username</div>
                        <div>{{ todo.owner }}</div>
                      </v-col>
                      <v-col md="2" sm="4">
                        <div class="caption grey--text">Due by</div>
                        <div>{{ todo.due }}</div>
                      </v-col>
                      <v-col class="d-flex align-center justify-end" md="2" sm="4">
                        <v-chip :color="chipColor(todo.status)" class="caption white--text">
                          {{ todo.status }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-divider v-if="index < todoList.length - 1" :key="index" />
            </div>
          </template>
        </v-list-item-group>
      </v-list>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Nav from '@/components/Nav/Index.vue';
import EditTodo from '@/views/TodoList/EditTodo.vue';

import { Todo, TodoListModule } from '@/store/modules/todo-list';

@Component({
  components: {
    Nav,
    EditTodo
  }
})
export default class Dashboard extends Vue {
  private breadcrumbs = [
    {
      text: 'Dashboard',
      disabled: true,
      href: '/'
    }
  ];

  private selected: string[] = [];

  chipColor(status: string): string {
    switch (status) {
      case 'complete':
        return '#20B2AA';
      case 'ongoing':
        return '#FFA500';
      case 'overdue':
        return '#FF6347';
      default:
        return '#FFFFFF';
    }
  }

  get todoList(): Todo[] {
    return TodoListModule.todos;
  }

  private sortBy(prop: string): void {
    TodoListModule.sort_by(prop);
  }

  private deleteTodo(): void {
    TodoListModule.deletes(this.selected);
    this.selected = [];
  }

  private setSelectedTodo(): void {
    if (this.selected.length === 1) {
      TodoListModule.SET_SELECTED_TODO(this.selected[0]);
    }
  }

  created(): void {
    TodoListModule.watcher();
  }
}
</script>

<style scoped>
.todo.complete {
  border-left: 4px solid lightseagreen;
}

.todo.ongoing {
  border-left: 4px solid orange;
}

.todo.overdue {
  border-left: 4px solid tomato;
}
</style>
