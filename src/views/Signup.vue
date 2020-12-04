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
          <v-card-title>Signup</v-card-title>
          <v-card-text>
            <!-- 登录表单 -->
            <v-form
              ref="form"
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
                label="Username"
                prepend-icon="mdi-form-textbox"
                required
                v-model="username"
                :rules="usernameRules"
                :counter="30"
                error-count="1"
                :error-messages="usernameErrorMessages"
              ></v-text-field>
              
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                required
                v-model="password"
                :rules="passwordRules"
                :counter="18"
                error-count="1"
                :error-messages="passwordErrorMessages"
              ></v-text-field>
              
              <v-text-field
                label="Password Confirmation"
                prepend-icon="mdi-lock"
                required
                v-model="passwordConfirmation"
                :rules="passwordConfirmationRules"
                :counter="18"
              ></v-text-field>
            
            </v-form>
          </v-card-text>
          
          <v-card-actions class="pb-4">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mx-2"
              @click="signup"
              :loading="loading"
            >
              Signup
            </v-btn>
            
            <v-btn
              color="warning"
              class="mx-2"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      username: '',
      usernameRules: [
        v => !!v || 'Username is required.',
        v => (v && v.length <= 30) || 'Username must be less than 30 characters.',
      ],
      usernameErrorMessages: [],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required.',
        v => (v && v.length >= 8 && v.length <= 18) || 'Password must be greater than 8 characters and less than 18 characters.',
      ],
      passwordErrorMessages: [],
      passwordConfirmation: '',
      passwordConfirmationRules: [
        v => !!v || 'Password Confirmation is required.',
        v => (v === this.password) || 'It does not match the password entered above.'
      ],
      
      alert: {
        success: false,
        error: false,
        color: '',
        text: '',
      },
    }
  },
  
  methods: {
    signup() {
      this.loading = true;
      
      const signupForm = {
        email: this.email,
        username: this.username,
        password: this.password,
      }
      
      this.$store.dispatch('auth/signup', signupForm)
        .then(() => {
          this.emailErrorMessages.length = 0
          this.usernameErrorMessages.length = 0
          this.passwordErrorMessages.length = 0
          
          this.alert = {
            error: false,
            success: true,
            color: 'success',
            text: 'Success!',
          }
          // TODO 跳回之前访问的页面
        })
        .catch(err => {
          for (let k in err) {
            if (k === 'email') {
              this.emailErrorMessages.push.apply(this.emailErrorMessages, err.email)
            }
            if (k === 'username') {
              this.usernameErrorMessages.push.apply(this.usernameErrorMessages, err.username)
            }
            if (k === 'password') {
              this.passwordErrorMessages.push.apply(this.passwordErrorMessages, err.password)
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>