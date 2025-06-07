import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  type: "registration" | "sponsor" | "food" | "shirt";
  name: string;
  price: number;
  quantity: number;
  metadata?: object;
  partner?: {
    id: string;
    name: string;
  };
  shirtData?: {
    name?: string;
    size: string;
  }[];
};

type CartState = {
  items: CartItem[];
};

export const loadCartFromLocalStorage = (userId: string): CartState => {
  try {
    const stored = localStorage.getItem(`cart-${userId}`);
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
};

export const saveCartToLocalStorage = (userId: string, cart: CartState) => {
  try {
    localStorage.setItem(`cart-${userId}`, JSON.stringify(cart));
  } catch {}
};

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index > -1) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, addItem, updateItemQuantity, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
