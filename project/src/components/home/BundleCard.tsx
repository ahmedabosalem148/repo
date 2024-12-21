import React from 'react';
import { Package } from 'lucide-react';
import type { Bundle } from '../../types';

interface BundleCardProps {
  bundle: Bundle;
  onViewDetails: (bundleId: string) => void;
}

export function BundleCard({ bundle, onViewDetails }: BundleCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className={`p-6 ${
        bundle.type === 'Premium' ? 'bg-indigo-600' :
        bundle.type === 'Standard' ? 'bg-indigo-500' :
        'bg-indigo-400'
      }`}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{bundle.name}</h3>
          <Package className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">{bundle.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-gray-900">${bundle.price}</span>
          <span className="text-green-600 font-medium">Save ${bundle.savings}</span>
        </div>
        <button
          onClick={() => onViewDetails(bundle.id)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}