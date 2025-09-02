import React, { useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { InvoiceItem, VEGETABLES } from '../types/Invoice';

interface InvoiceFormProps {
  onAddItem: (item: Omit<InvoiceItem, 'id' | 'total'>) => void;
  currentItems: InvoiceItem[];
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onAddItem, currentItems }) => {
  const [vegetable, setVegetable] = useState('');
  const [customVegetable, setCustomVegetable] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const name = vegetable === 'Autre' ? customVegetable : vegetable;
    const qty = parseFloat(quantity);
    const price = parseFloat(unitPrice);
    
    if (!name || !qty || !price || qty <= 0 || price <= 0) {
      alert('Veuillez remplir tous les champs avec des valeurs valides');
      return;
    }
    
    onAddItem({
      name,
      quantity: qty,
      unitPrice: price
    });
    
    // Reset form
    setVegetable('');
    setCustomVegetable('');
    setQuantity('');
    setUnitPrice('');
  };

  const quickQuantities = [0.25, 0.5, 1, 2, 3, 5];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-2 rounded-lg">
          <ShoppingCart className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Ajouter un légume</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sélection du légume */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Légume
          </label>
          <select
            value={vegetable}
            onChange={(e) => setVegetable(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Choisir un légume...</option>
            {VEGETABLES.map(veg => (
              <option key={veg} value={veg}>{veg}</option>
            ))}
            <option value="Autre">Autre...</option>
          </select>
        </div>

        {/* Légume personnalisé */}
        {vegetable === 'Autre' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom du légume
            </label>
            <input
              type="text"
              value={customVegetable}
              onChange={(e) => setCustomVegetable(e.target.value)}
              placeholder="Entrer le nom du légume"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        )}

        {/* Quantité */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantité (kg)
          </label>
          <div className="space-y-3">
            <input
              type="number"
              step="0.25"
              min="0.25"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 1.5"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
            <div className="flex flex-wrap gap-2">
              {quickQuantities.map(qty => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => setQuantity(qty.toString())}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-sm font-medium"
                >
                  {qty} kg
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prix unitaire */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Prix par kilogramme (FCFA/kg)
          </label>
          <input
            type="number"
            step="25"
            min="0"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="Ex: 1000 FCFA/kg"
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Entrez le prix pour 1 kilogramme de ce légume
          </p>
        </div>

        {/* Aperçu du total */}
        {quantity && unitPrice && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium">
              Montant de cet article : {(parseFloat(quantity) * parseFloat(unitPrice)).toLocaleString()} FCFA
            </p>
          </div>
        )}

        {/* Bouton d'ajout */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-3"
        >
          <Plus className="w-6 h-6" />
          Ajouter à la facture
        </button>
      </form>

      {/* Résumé rapide */}
      {currentItems.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Articles dans la facture : <span className="font-bold">{currentItems.length}</span>
          </p>
          <p className="text-lg font-bold text-green-600">
            Total actuel : {currentItems.reduce((sum, item) => sum + item.total, 0).toLocaleString()} FCFA
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;