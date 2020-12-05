<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <!-- 提示条 -->
        <v-alert
          dense
          dismissible
          v-model="alert.success"
          dark
          :color="alert.color"
          class="mx-auto"
          max-width="600px"
          icon="mdi-check"
        >
          {{ alert.text }}
        </v-alert>
        <v-alert
          dense
          dismissible
          v-model="alert.error"
          dark
          :color="alert.color"
          class="mx-auto"
          max-width="600px"
          icon="mdi-alert-circle"
        >
          {{ alert.text }}
        </v-alert>
        
        <v-card
          max-width="600px"
          class="mx-auto"
        >
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <!-- 登录表单 -->
            <v-form
              ref="loginForm"
              v-model="valid"
            >
              
              <v-text-field
                label="E-mail"
                prepend-icon="mdi-email"
                required
                v-model="email"
                :rules="emailRules"
                error-count="1"
                :error-messages="emailErrorMessages"
              ></v-text-field>
              
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                required
                v-model="password"
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            
            </v-form>
          </v-card-text>
          
          <v-card-actions class="pb-4">
            <!-- 登录按钮 -->
            <v-btn
              :disabled="!valid"
              color="success"
              class="mx-2"
              @click="login"
              :loading="loading"
            >
              Login
            </v-btn>
            
            <v-btn
              color="warning"
              class="mx-2"
              router
              :to="links.signup.route"
            >
              Signup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      valid: true,
      loading: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required.',
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'E-mail must be valid.'
        }
      ],
      emailErrorMessages: [],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required.',
      ],
      showPassword: false,
      
      alert: {
        success: false,
        error: false,
        color: '',
        text: '',
      },
    }
  },
  
  computed: {
    ...mapState('links', [
      'links',
    ])
  },
  
  methods: {
    login() {
      this.loading = true;
      
      const loginForm = {
        email: this.email,
        password: this.password,
      }
      
      this.$store.dispatch('auth/login', loginForm)
        .then(() => {
          this.emailErrorMessages = []
          
          this.alert = {
            error: false,
            success: true,
            text: 'Success! ',
            color: 'success',
          }
          
          // 重定向回登陆前访问的页面
          this.$router.push(this.$route.query.redirect || '/')
        })
        .catch(err => {
          if ('email' in err) {
            this.emailErrorMessages = this.emailErrorMessages.concat(err.email)
          }
          if ('message' in err) {
            this.alert = {
              error: true,
              success: false,
              text: 'Error! ' + err.message,
              color: 'error',
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  
  watch: {
    email() {
      this.emailErrorMessages = []
    },
    password() {
      this.emailErrorMessages = []
    }
  },
}
</script>