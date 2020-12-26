<template>
  <div>
    <!-- 创建新项目按钮 -->
    <v-btn
      depressed
      color=""
      class="text-capitalize"
      @click.stop="dialog = true"
    >
      Add new project
    </v-btn>

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
              :items="allStates"
              required
              v-model="status"
              :rules="statusRules"
            >
            </v-select>

            <div class="mt-4">
              <!-- 提交按钮 -->
              <v-btn
                color="primary"
                class="mr-4"
                @click="submit"
                :disabled="!valid"
                :loading="loading"
              >
                Submit
              </v-btn>

              <!-- 重置表单按钮 -->
              <v-btn class="white--text" color="warning" @click="reset">
                Reset
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { SnackbarModule } from '@/store/modules/snackbar';
import { ProfileModule } from '@/store/modules/profile';
import { ProjectModule } from '@/store/modules/projects';

@Component
export default class DialogForAddProject extends Vue {
  dialog = false;
  loading = false;
  valid = true;
  title = '';
  titleRules = [
    (v: string): string | boolean => !!v || 'Title is required',
    (v: string): string | boolean =>
      (v && v.length <= 40) || 'Title must be less than 40 characters.'
  ];
  content = '';
  contentRules = [
    (v: string): string | boolean => !!v || 'Content is required',
    (v: string): string | boolean =>
      (v && v.length <= 2048) || 'Content must be less than 2048 characters.'
  ];
  due = null;
  status = 'ongoing';
  statusRules = [
    (v: string): string | boolean => !!v || 'Status is required',
    (v: string): string | boolean =>
      this.allStates().indexOf(v) !== -1 || 'Status invalid.'
  ];

  get username(): string {
    return ProfileModule.username;
  }

  allStates(): string[] {
    return ProjectModule.allStates;
  }

  submit(): void {
    // 提交时按钮变成加载中。
    this.loading = true;

    const project = {
      title: this.title,
      content: this.content,
      due: this.due,
      person: this.username,
      status: this.status
    };

    ProjectModule.addProject(project)
      .then(() => {
        this.loading = false;
        this.dialog = false;
        SnackbarModule.showSnackbar('You have added a new project.');
      })
      .catch((err: { message: string }) => {
        this.loading = false;
        this.dialog = false;
        SnackbarModule.showSnackbar(err.message);
      });
  }

  reset(): void {
    (this.$refs.form as Vue & { reset: () => boolean }).reset();
  }
}
</script>
