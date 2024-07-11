import Contract from './Contract';

export interface Machine {
  id: string;
  title: string;
  rentexnumber: string;
  brand?: string;
  model: string;
  type?: string;
  year?: string;
  condition?: string;
  images?: string[];
  contract?: Contract;
}
