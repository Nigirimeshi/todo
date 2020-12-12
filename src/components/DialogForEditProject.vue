<template>
  <div>
    <!-- 编辑项目对话框 -->
    <v-tooltip top>
      <template #activator='{ on, attrs }'>
        <v-btn
          small
          depressed
          v-bind='attrs'
          v-on='on'
          @click='fillForm'
          @click.stop='dialog = true'
        >
          <v-icon small left>mdi-pencil</v-icon>
          <span class='text-lowercase'>Edit</span>
        </v-btn>
      </template>
      <span>Edit project</span>
    </v-tooltip>
  
    <v-dialog v-model='dialog' max-width='600px'>
      <v-card>
        <v-card-title>Edit Project</v-card-title>
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
                @click="submit"
                :disabled="!valid"
                :loading="loading"
              >
                Update
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
      status: '',
      statusRules: [
        (v) => !!v || 'Status is required',
        (v) => this.projectStatus.indexOf(v) !== -1 || 'Status invalid.'
      ]
    };
  },

  computed: {
    ...mapState('projects', ['selectedProject']),
    ...mapGetters('projects', ['projectStatus'])
  },
  
  methods: {
    ...mapMutations(['showSnackbar']),
    ...mapActions('projects', ['updateProject']),
    
    submit() {
      // 提交时按钮变成加载中。
      this.loading = true;
      
      const project = {
        id: this.selectedProject.id,
        title: this.title,
        content: this.content,
        due: this.due,
        status: this.status
      };
      this.updateProject(project)
        .then(() => {
          this.loading = false; // 恢复提交按钮
          this.dialog = false; // 关闭模态框
          this.showSnackbar({ text: 'You have updated a project.' });
        })
        .catch((err) => {
          this.loading = false;
          this.dialog = false;
          this.showSnackbar({ text: err.message });
        });
    },
    
    // 用选中项填充表单
    fillForm() {
      if (this.selectedProject) {
        this.title = this.selectedProject.title;
        this.content = this.selectedProject.content;
        this.due = this.selectedProject.due;
        this.status = this.selectedProject.status;
      }
    }
  }
};
</script>
