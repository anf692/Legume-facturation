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
  'Tomates Farcies',
  'Thin',
  'Oignons',
  'Carottes',
  'Choux',
  'Comcombre',
  'Aubergines',
  'Nawé',
  'Nadio',
  'Poivrons V J R',
  'Kani Thioukhili',
  'Kani Thili',
  'Kani Sofia',
  'Kani Goina',
  'Kani Salate',
  'Niambi',
  'Patasse',
  'Pommes de terre',
  'Persils chinois',
  'Diakhatou',
  'Bissap',
  'Inconues',
] as const;