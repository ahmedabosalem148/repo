import React from 'react';
import Button from './Button';

interface FilterOption {
  label: string;
  value: string;
}

interface BundleFilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const categories: FilterOption[] = [
  { label: 'Starter', value: 'starter' },
  { label: 'Premium', value: 'premium' },
  { label: 'Ultimate', value: 'ultimate' },
];

const BundleFilter: React.FC<BundleFilterProps> = ({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
}) => {
  const handleCategoryToggle = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-24 px-3 py-2 border rounded-md"
            min={0}
          />
          <span>to</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-24 px-3 py-2 border rounded-md"
            min={priceRange[0]}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(({ label, value }) => (
            <Button
              key={value}
              variant={selectedCategories.includes(value) ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategoryToggle(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BundleFilter;