import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import BundleCard from '../components/BundleCard';
import BundleFilter from '../components/BundleFilter';
import BundleSort from '../components/BundleSort';
import type { Bundle } from '../types';

// Mock data (replace with API call later)
const mockBundles: Bundle[] = [
  {
    id: '1',
    name: 'Starter Bundle',
    description: 'Perfect for beginners - includes essential items to get started',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    items: [
      { id: '1', name: 'Item 1', quantity: 1, price: 29.99 },
      { id: '2', name: 'Item 2', quantity: 1, price: 39.99 },
      { id: '3', name: 'Item 3', quantity: 1, price: 30.01 },
    ],
  },
  {
    id: '2',
    name: 'Premium Bundle',
    description: 'Our most popular bundle with premium selections',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    items: [
      { id: '4', name: 'Item 4', quantity: 1, price: 79.99 },
      { id: '5', name: 'Item 5', quantity: 1, price: 89.99 },
      { id: '6', name: 'Item 6', quantity: 1, price: 30.01 },
    ],
  },
  {
    id: '3',
    name: 'Ultimate Bundle',
    description: 'The complete package with everything you need',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    items: [
      { id: '7', name: 'Item 7', quantity: 1, price: 99.99 },
      { id: '8', name: 'Item 8', quantity: 1, price: 99.99 },
      { id: '9', name: 'Item 9', quantity: 1, price: 100.01 },
    ],
  },
];

const BundlesPage = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('price-asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort bundles
  const filteredBundles = useMemo(() => {
    return mockBundles
      .filter((bundle) => {
        const matchesPrice = bundle.price >= priceRange[0] && bundle.price <= priceRange[1];
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some((cat) => bundle.name.toLowerCase().includes(cat));
        const matchesSearch =
          searchQuery === '' ||
          bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bundle.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesPrice && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [mockBundles, priceRange, selectedCategories, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Bundles</h1>
        <BundleSort sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search bundles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <BundleFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="flex-1">
          {filteredBundles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bundles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BundlesPage;