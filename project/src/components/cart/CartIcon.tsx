import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export function CartIcon() {
  const itemCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
}