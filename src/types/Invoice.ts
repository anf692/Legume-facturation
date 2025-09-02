export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  items: InvoiceItem[];
  total: number;
}

export interface InvoiceTab {
  id: string;
  name: string;
  items: InvoiceItem[];
  createdAt: Date;
}

export const VEGETABLES = [
  'Tomates',
  'Oignons',
  'Carottes',
  'Pommes de terre',
  'Aubergines',
  'Nawé',
  'Poivrons',
  'Choux',
  'Nadio',
  'Kani Thioukhili',
  'Kani Sofia',
  'Niambi',
  'Patasse',
  'Diakhatou',
  'Comcombre',
  'Inconues',
] as const;