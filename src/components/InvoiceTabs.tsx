import React from 'react';
import { Plus, X, FileText } from 'lucide-react';
import { InvoiceTab } from '../types/Invoice';

interface InvoiceTabsProps {
  tabs: InvoiceTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onAddTab: () => void;
  onRemoveTab: (tabId: string) => void;
}

const InvoiceTabs: React.FC<InvoiceTabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  onAddTab,
  onRemoveTab
}) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto">
          {/* Onglets existants */}
          {tabs.map((tab) => {
            const total = tab.items.reduce((sum, item) => sum + item.total, 0);
            
            return (
              <div
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all cursor-pointer min-w-fit ${
                  activeTabId === tab.id
                    ? 'border-green-300 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                <FileText className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-medium text-sm">{tab.name}</p>
                  <p className="text-xs opacity-75">
                    {tab.items.length} article{tab.items.length > 1 ? 's' : ''} 
                    {total > 0 && ` • ${total.toLocaleString()} FCFA`}
                  </p>
                </div>
                
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveTab(tab.id);
                    }}
                    className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
                    title="Fermer cette facture"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Bouton pour ajouter un nouvel onglet */}
          <button
            onClick={onAddTab}
            className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-all min-w-fit"
            title="Nouvelle facture"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Nouvelle facture</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTabs;