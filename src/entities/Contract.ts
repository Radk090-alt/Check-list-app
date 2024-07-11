import Party from './Party';

export interface Contract {
  id: string;
  number: string;
  operator: Party;
  respondent?: Party;
  client: Party;
  client_key_account?: Party;
  client_contact?: Party;
}
