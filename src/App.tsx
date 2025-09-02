import React, { useState } from 'react';
import Navigation from './components/Navigation';
import InvoiceTabs from './components/InvoiceTabs';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDisplay from './components/InvoiceDisplay';
import InvoiceHistory from './components/InvoiceHistory';
import { InvoiceItem, InvoiceTab } from './types/Invoice';
import { saveInvoice, generateInvoiceNumber } from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState<'invoice' | 'history'>('invoice');
  const [invoiceTabs, setInvoiceTabs] = useState<InvoiceTab[]>([
    {
      id: crypto.randomUUID(),
      name: 'Facture 1',
      items: [],
      createdAt: new Date()
    }
  ]);
  const [activeInvoiceTabId, setActiveInvoiceTabId] = useState<string>(invoiceTabs[0].id);

  const currentTab = invoiceTabs.find(tab => tab.id === activeInvoiceTabId);
  const currentItems = currentTab?.items || [];

  const updateCurrentTabItems = (items: InvoiceItem[]) => {
    setInvoiceTabs(prev => prev.map(tab => 
      tab.id === activeInvoiceTabId 
        ? { ...tab, items }
        : tab
    ));
  };

  const handleAddItem = (item: Omit<InvoiceItem, 'id' | 'total'>) => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      ...item,
      total: item.quantity * item.unitPrice
    };
    
    updateCurrentTabItems([...currentItems, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    updateCurrentTabItems(currentItems.filter(item => item.id !== id));
  };

  const handleClearInvoice = () => {
    if (currentItems.length > 0 && 
        confirm('Êtes-vous sûr de vouloir effacer cette facture ?')) {
      updateCurrentTabItems([]);
    }
  };

  const handleSaveInvoice = () => {
    if (currentItems.length > 0) {
      const invoice = {
        id: crypto.randomUUID(),
        number: generateInvoiceNumber(),
        date: new Date(),
        items: currentItems,
        total: currentItems.reduce((sum, item) => sum + item.total, 0)
      };
      
      saveInvoice(invoice);
      updateCurrentTabItems([]);
      
      // Afficher un message de confirmation
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Facture enregistrée avec succès !';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
  };

  const handleAddInvoiceTab = () => {
    const newTab: InvoiceTab = {
      id: crypto.randomUUID(),
      name: `Facture ${invoiceTabs.length + 1}`,
      items: [],
      createdAt: new Date()
    };
    
    setInvoiceTabs(prev => [...prev, newTab]);
    setActiveInvoiceTabId(newTab.id);
  };

  const handleRemoveInvoiceTab = (tabId: string) => {
    const tabToRemove = invoiceTabs.find(tab => tab.id === tabId);
    
    if (tabToRemove && tabToRemove.items.length > 0) {
      if (!confirm('Cette facture contient des articles. Êtes-vous sûr de vouloir la fermer ?')) {
        return;
      }
    }
    
    const newTabs = invoiceTabs.filter(tab => tab.id !== tabId);
    setInvoiceTabs(newTabs);
    
    // Si on supprime l'onglet actif, basculer vers le premier onglet disponible
    if (activeInvoiceTabId === tabId && newTabs.length > 0) {
      setActiveInvoiceTabId(newTabs[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'invoice' && (
        <InvoiceTabs
          tabs={invoiceTabs}
          activeTabId={activeInvoiceTabId}
          onTabChange={setActiveInvoiceTabId}
          onAddTab={handleAddInvoiceTab}
          onRemoveTab={handleRemoveInvoiceTab}
        />
      )}
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'invoice' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <InvoiceForm 
                onAddItem={handleAddItem} 
                currentItems={currentItems}
              />
            </div>
            <div>
              <InvoiceDisplay
                items={currentItems}
                onClearInvoice={handleClearInvoice}
                onSaveInvoice={handleSaveInvoice}
                onRemoveItem={handleRemoveItem}
              />
            </div>
          </div>
        ) : (
          <InvoiceHistory />
        )}
      </main>

      {/* Styles pour l'impression */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable, .printable * {
            visibility: visible;
          }
          .printable {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          nav, button, .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;