import React from "react";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../store/cartSlice";
import type { BundleItem } from "../../types";
import { RootState } from "../../store";

interface BundleItemCardProps {
  item: BundleItem;
}

export function BundleItemCard({ item }: BundleItemCardProps) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((cartItem) => cartItem.id === item.id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addItem(item));
  };

  const handleQuantityChange = (increase: boolean) => {
    if (increase) {
      dispatch(addItem(item));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const formatPrice = (price: number) => `$${price.toLocaleString()}`;

  return (
    <div className="border rounded-lg p-4 flex items-start space-x-4">
      <img
        src={item.image || "placeholder.jpg"}
        alt={item.name || "Unknown Item"}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-1">
        <h5 className="font-semibold">{item.name || "Unknown Item"}</h5>
        <p className="text-sm text-gray-600">
          {item.description || "No description available"}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-medium">{formatPrice(item.price || 0)}</span>
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(true)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
