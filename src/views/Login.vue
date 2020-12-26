<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
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
          icon="mdi-alert-circle"
          max-width="600px"
        >
          {{ alert.text }}
        </v-alert>

        <v-card class="mx-auto" max-width="600px">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <!-- 登录表单 -->
            <v-form ref="loginForm" v-model="valid">
              <v-text-field
                v-model="email"
                :error-messages="emailErrorMessages"
                required
                :rules="emailRules"
                error-count="1"
                label="E-mail"
                prepend-icon="mdi-email"
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
              :loading="loading"
              class="mx-2"
              color="success"
              @click="submit"
            >
              Login
            </v-btn>

            <v-btn :to="signupURL" class="mx-2" color="warning" router>
              Signup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

import { Link, LinksModule } from '@/store/modules/links';
import { AuthModule } from '@/store/modules/auth';

@Component
export default class Login extends Vue {
  valid = true;
  loading = false;
  email = '';
  emailRules = [
    (v: string): string | boolean => !!v || 'E-mail is required.',
    (v: string): string | boolean => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || 'E-mail must be valid.';
    }
  ];
  emailErrorMessages = [];
  password = '';
  passwordRules = [
    (v: string): string | boolean => !!v || 'Password is required.'
  ];
  showPassword = false;

  alert = {
    success: false,
    error: false,
    color: '',
    text: ''
  };

  signupURL = '/signup';

  get links(): Link[] {
    return LinksModule.data;
  }

  submit(): void {
    this.loading = true;

    AuthModule.login(this.email, this.password)
      .then(() => {
        this.emailErrorMessages = [];
        this.alert = {
          error: false,
          success: true,
          text: 'Success! ',
          color: 'success'
        };

        // 重定向回登陆前访问的页面
        this.$router.push((this.$route.query.redirect as string) || '/');
      })
      .catch((err) => {
        if ('email' in err) {
          this.emailErrorMessages = this.emailErrorMessages.concat(err.email);
        }
        if ('message' in err) {
          this.alert = {
            error: true,
            success: false,
            text: 'Error! ' + err.message,
            color: 'error'
          };
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  @Watch('email')
  emailChange(): void {
    this.emailErrorMessages = [];
  }

  @Watch('password')
  passwordChange(): void {
    this.emailErrorMessages = [];
  }
}
</script>
