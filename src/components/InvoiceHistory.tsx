import React, { useState, useEffect } from 'react';
import { History, Download, Trash2, Eye, Calendar, FileText } from 'lucide-react';
import { Invoice } from '../types/Invoice';
import { getInvoices, deleteInvoice } from '../utils/storage';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const InvoiceHistory: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const loadedInvoices = getInvoices().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setInvoices(loadedInvoices);
  };

  const handleDeleteInvoice = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      deleteInvoice(id);
      loadInvoices();
      if (selectedInvoice?.id === id) {
        setSelectedInvoice(null);
      }
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    generateInvoicePDF(invoice);
  };

  if (invoices.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center text-gray-500">
          <History className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Aucune facture enregistrée</p>
          <p className="text-sm">Les factures que vous générez apparaîtront ici</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Liste des factures */}
      <div className="bg-white rounded-xl shadow-lg border border-green-100">
        <div className="p-6 border-b border-gray-200 bg-green-50">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <History className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-green-800">Historique des factures</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedInvoice?.id === invoice.id
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
                }`}
                onClick={() => setSelectedInvoice(
                  selectedInvoice?.id === invoice.id ? null : invoice
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-gray-800">{invoice.number}</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(invoice.date, 'dd/MM/yyyy', { locale: fr })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {invoice.items.length} article{invoice.items.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        {invoice.total.toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadInvoice(invoice);
                      }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Télécharger PDF"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteInvoice(invoice.id);
                      }}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Détails de la facture sélectionnée */}
      {selectedInvoice && (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100">
          <div className="p-6 border-b border-gray-200 bg-blue-50">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-800">
                Détails - {selectedInvoice.number}
              </h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {selectedInvoice.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <p className="text-sm text-gray-600">
                      {item.quantity} kg × {item.unitPrice.toLocaleString()} FCFA/kg
                    </p>
                  </div>
                  <span className="font-bold text-green-600">
                    {item.total.toLocaleString()} FCFA
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-800">TOTAL</span>
                <span className="text-2xl font-bold text-green-800">
                  {selectedInvoice.total.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleDownloadInvoice(selectedInvoice)}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceHistory;