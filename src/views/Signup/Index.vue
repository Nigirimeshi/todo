<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <Alert :props="alert" />

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
            <v-btn :disabled="!valid" :loading="loading" class="mx-2" color="success" @click="submit"> Signup </v-btn>
            <v-btn :to="loginURL" class="mx-2" color="warning" router> Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import Alert from '@/components/Alert/Index.vue';

import { Link, LinksModule } from '@/store/modules/links';
import { UserModule } from '@/store/modules/user';
import { AlertMixin } from '@/components/Alert/mixin';
import { SignupFormMixin } from './mixin';

@Component({
  components: {
    Alert
  }
})
export default class Signup extends Mixins(SignupFormMixin, AlertMixin) {
  private loginURL = '/login';

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
        this.alertSuccess('Success!');
        this.$router.push((this.$route.query.redirect as string) || '/');
      })
      .catch((err) => {
        if ('email' in err) {
          this.emailErrorMessages.push.apply(this.emailErrorMessages, err.email);
        }
        if ('username' in err) {
          this.usernameErrorMessages.push.apply(this.usernameErrorMessages, err.username);
        }
        if ('password' in err) {
          this.passwordErrorMessages.push.apply(this.passwordErrorMessages, err.password);
        }
        if ('message' in err) {
          this.alertError(`Error! ${err.message}`);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  created(): void {
    this.setMaxWidth('600px');
  }
}
</script>
