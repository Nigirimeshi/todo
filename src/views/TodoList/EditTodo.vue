<template>
  <div>
    <!-- 编辑项目对话框 -->
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn small depressed v-bind="attrs" v-on="on" @click="fillForm" @click.stop="dialog = true">
          <v-icon small left>mdi-pencil</v-icon>
          <span class="text-lowercase">Edit</span>
        </v-btn>
      </template>
      <span>Edit project</span>
    </v-tooltip>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>Edit Project</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <!-- 标题输入框 -->
            <v-text-field
              :counter="40"
              label="Title"
              prepend-icon="mdi-folder"
              required
              v-model="title"
              :rules="titleRules"
            ></v-text-field>

            <!-- 内容输入框 -->
            <v-textarea
              v-model="content"
              :counter="2048"
              required
              :rules="contentRules"
              label="Content"
              prepend-icon="mdi-pencil"
            ></v-textarea>

            <!-- 日期选择框 -->
            <v-menu min-width="290px" offset-y>
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="due"
                  v-bind="attrs"
                  readonly
                  v-on="on"
                  label="Due date"
                  prepend-icon="mdi-calendar-range"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>

            <!-- 状态单选框 -->
            <v-select
              label="Status"
              prepend-icon="mdi-progress-check"
              :items="selectableStates"
              required
              v-model="status"
              :rules="statusRules"
            >
            </v-select>

            <div class="mt-4">
              <!-- 提交按钮 -->
              <v-btn color="primary" @click="submit" :disabled="!valid" :loading="loading"> Update </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';

import { SnackbarModule } from '@/store/modules/snackbar';
import { TodoListModule } from '@/store/modules/todo-list';
import { UserModule } from '@/store/modules/user';
import { TodoFormMixin } from '@/views/TodoList/mixin';

@Component
export default class EditTodo extends Mixins(TodoFormMixin) {
  private submit(): void {
    // 提交时按钮变成加载中。
    this.loading = true;

    const project = {
      id: TodoListModule.selectedTodo.id,
      title: this.title,
      content: this.content,
      person: UserModule.name,
      due: this.due,
      status: this.status
    };
    TodoListModule.update(project)
      .then(() => {
        this.loading = false;
        this.dialog = false;
        SnackbarModule.showSnackbar('You have updated a project.');
      })
      .catch((err) => {
        this.loading = false;
        this.dialog = false;
        SnackbarModule.showSnackbar(err.message);
      });
  }

  // 用选中项填充表单
  private fillForm(): void {
    if (TodoListModule.selectedTodo) {
      this.title = TodoListModule.selectedTodo.title;
      this.content = TodoListModule.selectedTodo.content;
      this.due = TodoListModule.selectedTodo.due;
      this.status = TodoListModule.selectedTodo.status;
    }
  }
}
</script>
