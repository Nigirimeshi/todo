<template>
  <div>
    <!-- 创建新项目按钮 -->
    <v-btn depressed color="" class="text-capitalize" @click.stop="dialog = true"> Add new project </v-btn>

    <!-- 新建项目对话框 -->
    <v-dialog v-model="dialog" max-width="600px">
      <!-- 对话框内容 -->
      <v-card>
        <v-card-title class="grey--text">Add a new project</v-card-title>
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
              <v-btn color="primary" class="mr-4" @click="submit" :disabled="!valid" :loading="loading"> Submit </v-btn>

              <!-- 重置表单按钮 -->
              <v-btn class="white--text" color="warning" @click="reset"> Reset </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { AppModule } from '@/store/modules/app';
import { Component, Mixins, Vue } from 'vue-property-decorator';

import { TodoListModule } from '@/store/modules/todo-list';
import { UserModule } from '@/store/modules/user';
import { TodoFormMixin } from '@/views/TodoList/mixin';

@Component
export default class AddTodo extends Mixins(TodoFormMixin) {
  private submit(): void {
    // 提交时按钮变成加载中。
    this.loading = true;

    const todo = {
      title: this.title,
      content: this.content,
      due: this.due,
      status: this.status,
      userID: UserModule.id
    };

    TodoListModule.add(todo)
      .then(() => {
        AppModule.showSnackbar('You have added a new project.');
      })
      .catch((err: { message: string }) => {
        AppModule.showSnackbar(err.message);
      })
      .finally(() => {
        this.loading = false;
        this.dialog = false;
      });
  }

  private reset(): void {
    (this.$refs.form as Vue & { reset: () => boolean }).reset();
  }
}
</script>
