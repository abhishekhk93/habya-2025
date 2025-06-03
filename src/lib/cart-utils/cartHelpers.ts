// utils/cartHelpers.ts

import { CartItem } from '@/store/slices/cartSlice'; // Adjust based on your structure

export function canAddRegistrationItem(cartItems: CartItem[]): boolean {
  const registrationCount = cartItems.filter((item) => item.type === "registration").length;
  return registrationCount < 3;
}

export const isItemExistsInCart = (cartItems: CartItem[], id: string) => {
  return cartItems.some(item => item.id === id);
};

export const isItemAddable = (cartItems: CartItem[], newItem: CartItem): boolean => {
  const registrationCount = cartItems.filter(item => item.type === 'registration').length;
  const hasSponsor = cartItems.some(item => item.type === 'sponsor');

  if (newItem.type === 'registration') {
    if (registrationCount >= 3) return false;
    if (isItemExistsInCart(cartItems, newItem.id)) return false;
  }

  if (newItem.type === 'sponsor') {
    if (hasSponsor) return false;
  }

  return true;
};

export const getTotalAmount = (cartItems: CartItem[]) => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getTotalItems = (cartItems: CartItem[]) => {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

export const getItemQuantity = (cartItems: CartItem[], id: string): number => {
  return cartItems.find(item => item.id === id)?.quantity || 0;
};

export const getCartSummary = (cartItems: CartItem[]) => {
  return cartItems.map(item => ({
    name: item.name,
    quantity: item.quantity,
    subtotal: item.price * item.quantity
  }));
};
