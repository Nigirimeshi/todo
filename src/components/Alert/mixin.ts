import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export class AlertMixin extends Vue {
  protected alert = {
    status: '',
    color: '',
    text: '',
    maxWidth: ''
  };

  protected setMaxWidth(width: string): void {
    this.alert.maxWidth = width;
  }

  protected alertSuccess(text: string): void {
    this.alert.status = 'success';
    this.alert.color = 'success';
    this.alert.text = text;
  }

  protected alertError(text: string): void {
    this.alert.status = 'error';
    this.alert.color = 'error';
    this.alert.text = text;
  }
}
