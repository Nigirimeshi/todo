import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

@Component
export class LoginMixin extends Vue {
  protected valid = true;
  protected loading = false;
  protected email = '';
  protected emailRules = [
    (v: string): string | boolean => !!v || 'E-mail is required.',
    (v: string): string | boolean => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || 'E-mail must be valid.';
    }
  ];
  protected emailErrorMessages = [];
  protected password = '';
  protected passwordRules = [(v: string): string | boolean => !!v || 'Password is required.'];
  protected passwordErrorMessages = [];
  protected showPassword = false;

  public validate(): boolean {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  @Watch('email')
  private emailChange(): void {
    this.emailErrorMessages = [];
  }

  @Watch('password')
  private passwordChange(): void {
    this.passwordErrorMessages = [];
  }
}
