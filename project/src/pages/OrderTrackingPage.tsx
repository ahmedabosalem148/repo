import React, { useState } from 'react';
import { Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';
import Button from '../components/Button';
import { cn } from '../lib/utils';
import type { Order, OrderStatus } from '../types';

// Mock order data
const mockOrder: Order = {
  id: 'ORD123456',
  userId: '1',
  bundleId: '1',
  status: 'processing',
  totalAmount: 199.99,
  createdAt: '2024-03-15T10:30:00Z',
};

const statusSteps: { status: OrderStatus; icon: React.ElementType; label: string }[] = [
  { status: 'placed', icon: CheckCircle2, label: 'Order Placed' },
  { status: 'processing', icon: Clock, label: 'Processing' },
  { status: 'shipped', icon: Truck, label: 'Shipped' },
  { status: 'delivered', icon: MapPin, label: 'Delivered' },
];

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock API call - replace with actual tracking API
    if (orderId === mockOrder.id) {
      setOrder(mockOrder);
    } else {
      setError('Order not found');
    }
  };

  const getStepStatus = (stepStatus: OrderStatus) => {
    if (!order) return 'upcoming';
    
    const statusIndex = statusSteps.findIndex(s => s.status === order.status);
    const stepIndex = statusSteps.findIndex(s => s.status === stepStatus);
    
    if (stepIndex < statusIndex) return 'complete';
    if (stepIndex === statusIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Package className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
        <p className="text-gray-600 mt-2">Enter your order ID to track your package</p>
      </div>

      <form onSubmit={handleTrackOrder} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter order ID (e.g., ORD123456)"
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          <Button type="submit">Track Order</Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </form>

      {order && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
            <p className="text-sm text-gray-600">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {statusSteps.map((step, index) => {
              const status = getStepStatus(step.status);
              const Icon = step.icon;
              
              return (
                <div key={step.status} className="relative">
                  {index !== statusSteps.length - 1 && (
                    <div
                      className={cn(
                        'absolute left-6 top-6 h-full w-0.5 -ml-px',
                        status === 'complete' ? 'bg-indigo-600' : 'bg-gray-200'
                      )}
                    />
                  )}
                  <div className="relative flex items-center">
                    <div
                      className={cn(
                        'h-12 w-12 rounded-full border-2 flex items-center justify-center',
                        {
                          'border-indigo-600 bg-indigo-600 text-white': status === 'complete',
                          'border-indigo-600 bg-white text-indigo-600': status === 'current',
                          'border-gray-200 bg-white text-gray-400': status === 'upcoming',
                        }
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p
                        className={cn('font-medium', {
                          'text-indigo-600': status === 'current',
                          'text-gray-900': status === 'complete',
                          'text-gray-500': status === 'upcoming',
                        })}
                      >
                        {step.label}
                      </p>
                      {status === 'current' && (
                        <p className="text-sm text-gray-500">
                          Your order is currently in this stage
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;