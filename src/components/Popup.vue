<template>
  <!-- 模态框 -->
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <!-- 添加新项目按钮 -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        v-bind="attrs"
        v-on="on"
        color=""
        class="text-capitalize"
      >
        Add new project
      </v-btn>
    </template>
    
    <!-- 模态框内容 -->
    <v-card>
      <v-card-title>Add a new project</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- 标题输入框 -->
          <v-text-field
            v-model="title"
            :rules="titleRules"
            :counter="20"
            prepend-icon="mdi-folder"
            label="Title"
            required
          ></v-text-field>
          <!-- 内容输入框 -->
          <v-textarea
            v-model="content"
            :rules="contentRules"
            :counter="2048"
            prepend-icon="mdi-pencil"
            label="Content"
            required
          ></v-textarea>
          <!-- 日期选择框 -->
          <v-menu
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Due date"
                prepend-icon="mdi-calendar-range"
                readonly
                v-model="due"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="due"
            ></v-date-picker>
          </v-menu>
        </v-form>
      </v-card-text>
      
      <v-card-actions class="pb-4">
        <!-- 提交按钮 -->
        <v-btn
          depressed
          color="primary"
          class="mx-4"
          @click="submit"
          :disabled="!valid"
          :loading="loading"
        >
          Submit
        </v-btn>
        <!-- 重置表单按钮 -->
        <v-btn
          depressed
          color="warning"
          class="white--text"
          @click="reset"
        >
          Reset
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import db from '@/plugins/firebase'

export default {
  data: () => ({
    dialog: false,
    valid: true,
    loading: false,
    snackbar: false,
    
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => v.length <= 20 || 'Title must be less than 20 characters',
    ],
    content: '',
    contentRules: [
      v => !!v || 'Content is reuqired',
      v => v.length <= 2048 || 'Content must be less than 2048 characters',
    ],
    due: null,
    
    user: {
      name: 'Yang',  // TODO 获取当前用户
    },
  }),
  methods: {
    submit() {
      // 提交时按钮变成加载中。
      this.loading = true;
      
      const project = {
        title: this.title,
        content: this.content,
        due: this.due,
        person: this.user.name,
        status: 'ongoing',  // TODO 状态集中定义
      }
      
      db.collection('projects').add(project).then(() => {
        this.loading = false; // 恢复提交按钮
        this.dialog = false;  // 关闭模态框
        this.$emit('showSnackbar')  // 触发事件，显示消息条，提示用户已提交完成
      })
      
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
