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
    <v-dialog v-model='dialog' max-width='600px'>
      <!-- 对话框内容 -->
      <v-card>
        <v-card-title class='grey--text'>Add a new project</v-card-title>
        <v-card-text>
          <v-form ref='form' v-model='valid'>
            <!-- 标题输入框 -->
            <v-text-field
              :counter='40'
              label='Title'
              prepend-icon='mdi-folder'
              required
              v-model='title'
              :rules='titleRules'
            ></v-text-field>
        
            <!-- 内容输入框 -->
            <v-textarea
              v-model='content'
              :counter='2048'
              required
              :rules='contentRules'
              label='Content'
              prepend-icon='mdi-pencil'
            ></v-textarea>
        
            <!-- 日期选择框 -->
            <v-menu min-width='290px' offset-y>
              <template #activator='{ on, attrs }'>
                <v-text-field
                  v-model='due'
                  v-bind='attrs'
                  readonly
                  v-on='on'
                  label='Due date'
                  prepend-icon='mdi-calendar-range'
                ></v-text-field>
              </template>
              <v-date-picker v-model='due'></v-date-picker>
            </v-menu>

            <!-- 状态单选框 -->
            <v-select
              label="Status"
              prepend-icon="mdi-progress-check"
              :items="projectStatus"
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
              <v-btn class='white--text' color='warning' @click='reset'>
                Reset
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      valid: true,
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 40) || 'Title must be less than 40 characters.'
      ],
      content: '',
      contentRules: [
        (v) => !!v || 'Content is required',
        (v) =>
          (v && v.length <= 2048) ||
          'Content must be less than 2048 characters.'
      ],
      due: null,
      status: 'ongoing',
      statusRules: [
        (v) => !!v || 'Status is required',
        (v) => this.projectStatus.indexOf(v) !== -1 || 'Status invalid.'
      ]
    };
  },
  
  computed: {
    ...mapState('profile', ['profile']),
    ...mapGetters('projects', ['projectStatus'])
  },
  
  methods: {
    ...mapMutations(['showSnackbar']),
    ...mapActions('projects', ['addProject']),
    
    submit() {
      // 提交时按钮变成加载中。
      this.loading = true;
      
      const project = {
        title: this.title,
        content: this.content,
        due: this.due,
        person: this.profile.name,
        status: this.status
      };
      
      this.addProject(project)
        .then(() => {
          this.loading = false; // 恢复提交按钮
          this.dialog = false; // 关闭模态框
          this.showSnackbar({ text: 'You have added a new project.' }); // 触发事件，显示消息条，提示用户已提交完成
        })
        .catch((err) => {
          this.loading = false;
          this.dialog = false;
          this.showSnackbar({ text: err.message });
        });
    },
    
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
