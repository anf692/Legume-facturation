import React from 'react';
import { Download, Printer, Trash2, FileText } from 'lucide-react';
import { InvoiceItem } from '../types/Invoice';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import { generateInvoiceNumber } from '../utils/storage';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface InvoiceDisplayProps {
  items: InvoiceItem[];
  onClearInvoice: () => void;
  onSaveInvoice: () => void;
  onRemoveItem: (id: string) => void;
}

const InvoiceDisplay: React.FC<InvoiceDisplayProps> = ({ 
  items, 
  onClearInvoice, 
  onSaveInvoice,
  onRemoveItem 
}) => {
  const total = items.reduce((sum, item) => sum + item.total, 0);
  const invoiceNumber = generateInvoiceNumber();
  const currentDate = new Date();

  const handleDownloadPDF = () => {
    const invoice = {
      id: crypto.randomUUID(),
      number: invoiceNumber,
      date: currentDate,
      items,
      total
    };
    
    generateInvoicePDF(invoice);
    onSaveInvoice();
  };

  const handlePrint = () => {
    window.print();
  };

  if (items.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Aucun article ajouté</p>
          <p className="text-sm">Commencez par ajouter des légumes à votre facture</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-green-100">
      {/* En-tête de facture */}
      <div className="p-6 border-b border-gray-200 bg-green-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-green-800">FACTURE DE VENTE</h2>
            <p className="text-green-600 font-medium">Numéro: {invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Date</p>
            <p className="font-bold text-gray-800">
              {format(currentDate, 'dd/MM/yyyy', { locale: fr })}
            </p>
          </div>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="p-6">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.quantity} kg × {item.unitPrice.toLocaleString()} FCFA/kg
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-green-600">
                  {item.total.toLocaleString()} FCFA
                </span>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer cet article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 p-4 bg-green-100 rounded-lg border-2 border-green-300">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-800">TOTAL</span>
            <span className="text-2xl font-bold text-green-800">
              {total.toLocaleString()} FCFA
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            Télécharger PDF
          </button>
          
          <button
            onClick={handlePrint}
            className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-3"
          >
            <Printer className="w-5 h-5" />
            Imprimer
          </button>
          
          <button
            onClick={onClearInvoice}
            className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-gray-600 transition-colors shadow-lg flex items-center justify-center gap-3"
          >
            <Trash2 className="w-5 h-5" />
            Nouvelle facture
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDisplay;