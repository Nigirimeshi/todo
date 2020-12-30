import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { TodoListModule } from '@/store/modules/todo-list';

@Component
export class TodoFormMixin extends Vue {
  protected dialog = false;
  protected loading = false;
  protected valid = true;
  protected title = '';
  protected titleRules = [
    (v: string): string | boolean => !!v || 'Title is required',
    (v: string): string | boolean => (v && v.length <= 40) || 'Title must be less than 40 characters.'
  ];
  protected content = '';
  protected contentRules = [
    (v: string): string | boolean => !!v || 'Content is required',
    (v: string): string | boolean => (v && v.length <= 2048) || 'Content must be less than 2048 characters.'
  ];
  protected due: string | null = null;
  protected status = 'ongoing';
  protected statusRules = [
    (v: string): string | boolean => !!v || 'Status is required',
    (v: string): string | boolean => this.selectableStates.indexOf(v) !== -1 || 'Status invalid.'
  ];

  get selectableStates(): string[] {
    return TodoListModule.selectableStates;
  }
}
