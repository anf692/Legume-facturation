import jsPDF from 'jspdf';
import { Invoice } from '../types/Invoice';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const generateInvoicePDF = (invoice: Invoice): void => {
  const pdf = new jsPDF();
  
  // Configuration
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;
  
  // En-tête
  pdf.setFontSize(20);
  pdf.setFont(undefined, 'bold');
  pdf.text('FACTURE DE VENTE', pageWidth / 2, y, { align: 'center' });
  
  y += 20;
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'normal');
  pdf.text(`Numéro: ${invoice.number}`, margin, y);
  pdf.text(`Date: ${format(invoice.date, 'dd/MM/yyyy', { locale: fr })}`, pageWidth - margin - 60, y);
  
  y += 30;
  
  // En-tête du tableau
  pdf.setFont(undefined, 'bold');
  pdf.text('Produit', margin, y);
  pdf.text('Quantité', margin + 60, y);
  pdf.text('Prix unitaire', margin + 100, y);
  pdf.text('Total', margin + 150, y);
  
  // Ligne de séparation
  y += 5;
  pdf.line(margin, y, pageWidth - margin, y);
  y += 15;
  
  // Articles
  pdf.setFont(undefined, 'normal');
  invoice.items.forEach(item => {
    pdf.text(item.name, margin, y);
    pdf.text(`${item.quantity} kg`, margin + 60, y);
    pdf.text(`${item.unitPrice} FCFA`, margin + 100, y);
    pdf.text(`${item.total} FCFA`, margin + 150, y);
    y += 15;
  });
  
  // Ligne de séparation
  y += 5;
  pdf.line(margin, y, pageWidth - margin, y);
  y += 15;
  
  // Total
  pdf.setFont(undefined, 'bold');
  pdf.setFontSize(14);
  pdf.text(`TOTAL: ${invoice.total} FCFA`, pageWidth - margin - 80, y);
  
  // Pied de page
  y += 40;
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text('Merci pour votre achat !', pageWidth / 2, y, { align: 'center' });
  
  // Télécharger le PDF
  pdf.save(`facture-${invoice.number}.pdf`);
};