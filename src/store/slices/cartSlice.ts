import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  type: 'registration' | 'sponsor' | 'food' | 'tshirt';
  name: string;
  price: number;
  quantity: number;
  metadata?: object;
  partner?: {
    id: string;
    name: string;
  };
};

type CartState = {
  items: CartItem[];
};

const loadCartFromLocalStorage = (): CartState => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveCartToLocalStorage = (cart: CartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch {}
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(i => i.id === action.payload.id);
      if (index > -1) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state);
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state);
    }
  }
});

export const { addItem, updateItemQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
