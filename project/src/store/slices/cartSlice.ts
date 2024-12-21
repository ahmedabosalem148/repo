import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Bundle } from '../../types';

interface CartState {
  bundle: Bundle | null;
  customizations: Record<string, number>;
  total: number;
}

const initialState: CartState = {
  bundle: null,
  customizations: {},
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setBundle: (state, action: PayloadAction<Bundle>) => {
      state.bundle = action.payload;
      state.total = action.payload.price;
    },
    updateCustomization: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const { itemId, quantity } = action.payload;
      state.customizations[itemId] = quantity;
      // Recalculate total based on customizations
      if (state.bundle) {
        state.total = state.bundle.price;
        Object.entries(state.customizations).forEach(([id, qty]) => {
          const item = state.bundle?.items.find(i => i.id === id);
          if (item) {
            state.total += (qty - item.quantity) * item.price;
          }
        });
      }
    },
    clearCart: (state) => {
      state.bundle = null;
      state.customizations = {};
      state.total = 0;
    },
  },
});

export const { setBundle, updateCustomization, clearCart } = cartSlice.actions;
export default cartSlice.reducer;