import { Component, Mixins, Watch } from 'vue-property-decorator';
import { LoginFormMixin } from '@/views/Login/mixin';

@Component
export class SignupFormMixin extends Mixins(LoginFormMixin) {
  protected displayName = '';
  protected displayNameRules = [
    (v: string): string | boolean => !!v || 'Username is required.',
    (v: string): string | boolean => (v && v.length <= 30) || 'Username must be less than 30 characters.'
  ];
  protected displayNameErrorMessages = [];
  public passwordRules = [
    (v: string): string | boolean => !!v || 'Password is required.',
    (v: string): string | boolean =>
      (v && v.length >= 8 && v.length <= 18) ||
      'Password must be greater than 8 characters and less than 18 characters.'
  ];
  protected passwordConfirmation = '';
  protected passwordConfirmationRules = [
    (v: string): string | boolean => !!v || 'Password Confirmation is required.',
    (v: string): string | boolean => this.passwordIsConsistent(v) || 'It does not match the password entered above.'
  ];

  private passwordIsConsistent(v: string): boolean {
    return v === this.password;
  }

  @Watch('displayName')
  private displayNameChange(): void {
    this.displayNameErrorMessages = [];
  }

  public passwordChange(): void {
    this.emailErrorMessages = [];
  }
}
