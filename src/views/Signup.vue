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
          <v-card-title>Signup</v-card-title>
          <v-card-text>
            <!-- 注册表单 -->
            <v-form ref="form" v-model="valid">
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
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-text-field
                label="Password Confirmation"
                prepend-icon="mdi-lock"
                required
                v-model="passwordConfirmation"
                :rules="passwordConfirmationRules"
                :counter="18"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions class="pb-4">
            <v-btn
              :disabled="!valid"
              :loading="loading"
              class="mx-2"
              color="success"
              @click="submit"
            >
              Signup
            </v-btn>

            <v-btn :to="loginURL" class="mx-2" color="warning" router>
              Login
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
import { UserModule } from '@/store/modules/user';

@Component
export default class Signup extends Vue {
  private valid = true;
  private loading = false;
  private email = '';
  private emailRules = [
    (v: string): string | boolean => !!v || 'E-mail is required.',
    (v: string): string | boolean => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || 'E-mail must be valid.';
    }
  ];
  private emailErrorMessages = [];
  private username = '';
  private usernameRules = [
    (v: string): string | boolean => !!v || 'Username is required.',
    (v: string): string | boolean =>
      (v && v.length <= 30) || 'Username must be less than 30 characters.'
  ];
  private usernameErrorMessages = [];
  private password = '';
  private passwordRules = [
    (v: string): string | boolean => !!v || 'Password is required.',
    (v: string): string | boolean =>
      (v && v.length >= 8 && v.length <= 18) ||
      'Password must be greater than 8 characters and less than 18 characters.'
  ];
  private passwordErrorMessages = [];
  private showPassword = false;
  private passwordConfirmation = '';
  private passwordConfirmationRules = [
    (v: string): string | boolean =>
      !!v || 'Password Confirmation is required.',
    (v: string): string | boolean =>
      this.passwordIsConsistent(v) ||
      'It does not match the password entered above.'
  ];

  private alert = {
    success: false,
    error: false,
    color: '',
    text: ''
  };

  private loginURL = '/login';

  private passwordIsConsistent(v: string): boolean {
    return v === this.password;
  }

  get links(): Link[] {
    return LinksModule.data;
  }

  private submit(): void {
    if (!this.validate()) {
      return;
    }

    this.loading = true;

    const signupForm = {
      email: this.email,
      username: this.username,
      password: this.password
    };

    UserModule.signup(signupForm)
      .then(() => {
        this.emailErrorMessages = [];
        this.usernameErrorMessages = [];
        this.passwordErrorMessages = [];
        this.alert = {
          error: false,
          success: true,
          color: 'success',
          text: 'Success!'
        };
        // 重定向回登陆前访问的页面
        this.$router.push((this.$route.query.redirect as string) || '/');
      })
      .catch((err) => {
        if ('email' in err) {
          this.emailErrorMessages.push.apply(
            this.emailErrorMessages,
            err.email
          );
        }
        if ('username' in err) {
          this.usernameErrorMessages.push.apply(
            this.usernameErrorMessages,
            err.username
          );
        }
        if ('password' in err) {
          this.passwordErrorMessages.push.apply(
            this.passwordErrorMessages,
            err.password
          );
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

  validate(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  @Watch('email')
  private emailChange(): void {
    this.emailErrorMessages = [];
  }

  @Watch('username')
  private usernameChange(): void {
    this.usernameErrorMessages = [];
  }

  @Watch('password')
  private passwordChange(): void {
    this.passwordErrorMessages = [];
  }
}
</script>
