import { Component, Mixins, Watch } from 'vue-property-decorator';
import { LoginMixin } from '@/views/Login/mixin';

@Component
export class SignupMixin extends Mixins(LoginMixin) {
  protected username = '';
  protected usernameRules = [
    (v: string): string | boolean => !!v || 'Username is required.',
    (v: string): string | boolean => (v && v.length <= 30) || 'Username must be less than 30 characters.'
  ];
  protected usernameErrorMessages = [];
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

  @Watch('username')
  private usernameChange(): void {
    this.usernameErrorMessages = [];
  }
}
