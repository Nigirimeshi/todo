<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <Alert :props="alert" max-width="600px" />

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
            <v-btn :disabled="!valid" :loading="loading" class="mx-2" color="success" @click="submit"> Login </v-btn>
            <v-btn :to="signupURL" class="mx-2" color="warning" router> Signup </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

import Alert from '@/components/Alert.vue';

import { Link, LinksModule } from '@/store/modules/links';
import { UserModule } from '@/store/modules/user';

@Component({
  components: {
    Alert
  }
})
export default class Login extends Vue {
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
  private password = '';
  private passwordRules = [(v: string): string | boolean => !!v || 'Password is required.'];
  private showPassword = false;

  private alert = {
    status: '',
    color: '',
    text: '',
    maxWidth: '600px'
  };

  private signupURL = '/signup';

  get links(): Link[] {
    return LinksModule.data;
  }

  private alertSuccess(text: string): void {
    this.alert.status = 'success';
    this.alert.color = 'success';
    this.alert.text = text;
  }

  private alertError(text: string): void {
    this.alert.status = 'error';
    this.alert.color = 'error';
    this.alert.text = text;
  }

  private submit(): void {
    this.loading = true;

    const loginForm = {
      email: this.email,
      password: this.password
    };

    UserModule.login(loginForm)
      .then(() => {
        this.emailErrorMessages = [];
        this.alertSuccess('Success!');
        this.$router.push((this.$route.query.redirect as string) || '/');
      })
      .catch((err) => {
        if ('email' in err) {
          this.emailErrorMessages = this.emailErrorMessages.concat(err.email);
        }
        if ('message' in err) {
          this.alertError(`Error! ${err.message}`);
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
