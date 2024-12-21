import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Package, CheckCircle } from 'lucide-react';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import Button from '../components/Button';
import { cn } from '../lib/utils';

type PaymentMethod = 'card' | 'installments';
type CardType = 'credit' | 'debit';

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  cardType: CardType;
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bundle, total } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    cardType: 'credit',
  });

  if (!bundle) {
    navigate('/cart');
    return null;
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setTimeout(() => {
        dispatch(clearCart());
        navigate('/track-order');
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
          <Button onClick={() => navigate('/track-order')}>Track Your Order</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
            
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={cn(
                  'flex-1 py-3 px-4 rounded-md border-2 flex items-center justify-center space-x-2',
                  paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <CreditCard className="h-5 w-5" />
                <span>Card Payment</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('installments')}
                className={cn(
                  'flex-1 py-3 px-4 rounded-md border-2 flex items-center justify-center space-x-2',
                  paymentMethod === 'installments'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <Package className="h-5 w-5" />
                <span>Installments</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {paymentMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Type
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="cardType"
                          value="credit"
                          checked={formData.cardType === 'credit'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Credit Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="cardType"
                          value="debit"
                          checked={formData.cardType === 'debit'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Debit Card
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'installments' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Split your payment into easy monthly installments
                  </p>
                  <div className="space-y-2">
                    {[3, 6, 12].map((months) => (
                      <label
                        key={months}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <div>
                          <input
                            type="radio"
                            name="installmentPlan"
                            value={months}
                            className="mr-2"
                          />
                          <span>{months} months</span>
                        </div>
                        <span className="text-gray-600">
                          ${(total / months).toFixed(2)}/month
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {bundle.image ? (
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-900">{bundle.name}</h3>
                <p className="text-sm text-gray-600">{bundle.description}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                {bundle.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="text-gray-900">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-medium">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-xl text-indigo-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;