import { Invoice } from '../types/Invoice';

const INVOICES_KEY = 'vegetable_invoices';

export const saveInvoice = (invoice: Invoice): void => {
  const invoices = getInvoices();
  invoices.push(invoice);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
};

export const getInvoices = (): Invoice[] => {
  const stored = localStorage.getItem(INVOICES_KEY);
  if (!stored) return [];
  
  return JSON.parse(stored).map((invoice: any) => ({
    ...invoice,
    date: new Date(invoice.date)
  }));
};

export const deleteInvoice = (id: string): void => {
  const invoices = getInvoices().filter(invoice => invoice.id !== id);
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
};

export const generateInvoiceNumber = (): string => {
  const invoices = getInvoices();
  const lastNumber = invoices.length > 0 
    ? Math.max(...invoices.map(inv => parseInt(inv.number.replace('FAC-', '')) || 0))
    : 0;
  return `FAC-${String(lastNumber + 1).padStart(4, '0')}`;
};