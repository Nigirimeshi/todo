<template>
  <!-- 模态框 -->
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <!-- 创建新项目按钮 -->
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
            label="Title"
            prepend-icon="mdi-folder"
            :counter="20"
            required
            v-model="title"
            :rules="titleRules"
          ></v-text-field>
          <!-- 内容输入框 -->
          <v-textarea
            label="Content"
            prepend-icon="mdi-pencil"
            clearable
            clear-icon="mdi-close-circle"
            required
            v-model="content"
            :rules="contentRules"
            :counter="2048"
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
import {mapState, mapMutations, mapActions} from "vuex"

export default {
  data: () => ({
    dialog: false,
    loading: false,
    
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      // FIXME TypeError: Cannot read property 'length' of undefined
      v => v.length <= 20 || 'Title must be less than 20 characters',
    ],
    content: '',
    contentRules: [
      v => !!v || 'Content is reuqired',
      // FIXME TypeError: Cannot read property 'length' of undefined
      v => v.length <= 2048 || 'Content must be less than 2048 characters',
    ],
    due: null,
  }),
  computed: {
    ...mapState('profile', [
      'profile',
    ]),
  },
  methods: {
    ...mapMutations([
      'showSnackbar',
    ]),
    ...mapActions('projects', [
      'addProject',
    ]),
    submit() {
      // 提交时按钮变成加载中。
      this.loading = true;
      
      const project = {
        title: this.title,
        content: this.content,
        due: this.due,
        person: this.profile.name,
        status: 'ongoing',  // TODO 状态集中定义
      }
      
      this.addProject({project: project}).then(() => {
        this.loading = false; // 恢复提交按钮
        this.dialog = false;  // 关闭模态框
        this.showSnackbar();  // 触发事件，显示消息条，提示用户已提交完成
      })
      
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
