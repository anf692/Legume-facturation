import React from 'react';
import { Calculator, History, Leaf } from 'lucide-react';

interface NavigationProps {
  activeTab: 'invoice' | 'history';
  onTabChange: (tab: 'invoice' | 'history') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-lg border-b border-green-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo et titre */}
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Nabou Ndiaye</h1>
              <p className="text-sm text-gray-600">Facturation légumes</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onTabChange('invoice')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'invoice'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span className="hidden sm:inline">Nouvelle facture</span>
            </button>
            
            <button
              onClick={() => onTabChange('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <History className="w-5 h-5" />
              <span className="hidden sm:inline">Historique</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;