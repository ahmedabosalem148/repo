import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Package, Minus, Plus, ShoppingCart } from 'lucide-react';
import { RootState } from '../store';
import { updateCustomization, clearCart } from '../store/slices/cartSlice';
import Button from '../components/Button';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bundle, customizations, total } = useSelector((state: RootState) => state.cart);

  if (!bundle) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some bundles to get started!</p>
        <Button onClick={() => navigate('/bundles')}>Browse Bundles</Button>
      </div>
    );
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity >= 0) {
      dispatch(updateCustomization({ itemId, quantity }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          {bundle.image ? (
            <img
              src={bundle.image}
              alt={bundle.name}
              className="w-24 h-24 object-cover rounded-md"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-gray-900">{bundle.name}</h2>
            <p className="text-gray-600">{bundle.description}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customize Your Bundle</h3>
          <div className="space-y-4">
            {bundle.items.map((item) => {
              const currentQuantity = customizations[item.id] ?? item.quantity;
              return (
                <div key={item.id} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">${item.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, currentQuantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{currentQuantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, currentQuantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
        </div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
          <Button
            className="flex-1"
            onClick={() => navigate('/payment')}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;