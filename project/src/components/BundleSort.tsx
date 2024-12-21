import React from 'react';
import { cn } from '../lib/utils';

interface BundleSortProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' },
];

const BundleSort: React.FC<BundleSortProps> = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={cn(
          'block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
          'border shadow-sm'
        )}
      >
        {sortOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BundleSort;