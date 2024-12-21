import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import BundleCard from '../components/BundleCard';

// Mock featured bundles data
const featuredBundles = [
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

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <Package className="h-16 w-16 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Discover Amazing Bundle Deals
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Explore our curated collection of premium bundles designed to give you the best value for your money.
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/bundles')}
          className="inline-flex items-center space-x-2"
        >
          <span>Explore Now</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </section>

      {/* Featured Bundles Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Bundles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} featured />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Bundles?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Curated Selection',
              description: 'Each bundle is carefully curated to provide maximum value',
            },
            {
              title: 'Best Prices',
              description: 'Save more when you buy items together in our bundles',
            },
            {
              title: 'Fast Delivery',
              description: 'Quick and reliable shipping for all bundle orders',
            },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;