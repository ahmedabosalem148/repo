import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Bundle } from '../../types';

interface BundlesState {
  items: Bundle[];
  loading: boolean;
  error: string | null;
}

const initialState: BundlesState = {
  items: [],
  loading: false,
  error: null,
};

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {
    setBundles: (state, action: PayloadAction<Bundle[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setBundles, setLoading, setError } = bundlesSlice.actions;
export default bundlesSlice.reducer;