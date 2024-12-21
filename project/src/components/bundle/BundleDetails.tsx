import React from "react";
import { X } from "lucide-react";
import type { Bundle } from "../../types";
import { BundleItemCard } from "./BundleItemCard";

interface BundleDetailsProps {
  bundle: Bundle;
  onClose: () => void;
}

export function BundleDetails({ bundle, onClose }: BundleDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        />
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl leading-6 font-bold text-gray-900">
                    {bundle.name}
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-lg font-semibold mb-2">Bundle Items</h4>
                  {bundle.items.length === 0 ? (
                    <p className="text-gray-500">
                      No items available for this bundle.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {bundle.items.map((item) => (
                        <BundleItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
