export type Form = Record<string, Field>;

export interface Field {
  type: 'int' | 'now' | 'text' | 'number' | 'simpleselect' | 'current_user' | 'email' | 'phone';
  name: string;
  editable: boolean;
  listable: boolean;
  relation: boolean;
  required: boolean;
  values?: Record<string, string>;
}
