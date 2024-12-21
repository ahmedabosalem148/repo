import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import Button from './Button';
import { setBundle } from '../store/slices/cartSlice';
import { cn } from '../lib/utils';
import type { Bundle } from '../types';

interface BundleCardProps {
  bundle: Bundle;
  featured?: boolean;
}

const BundleCard: React.FC<BundleCardProps> = ({ bundle, featured = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(setBundle(bundle));
    navigate('/cart');
  };

  return (
    <div className={cn(
      'bg-white rounded-lg shadow-md overflow-hidden',
      featured ? 'transform hover:scale-105 transition-transform' : ''
    )}>
      <div className="relative h-48">
        {bundle.image ? (
          <img
            src={bundle.image}
            alt={bundle.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{bundle.name}</h3>
        <p className="mt-1 text-gray-600 text-sm">{bundle.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">
            ${bundle.price.toFixed(2)}
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;