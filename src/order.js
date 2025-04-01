
import { useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [addedItemId, setAddedItemId] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 800);
  };

  const removeFromCart = (index) => {
    setCart((prev) => {
      const item = prev[index];
      if (item.quantity > 1) {
        return prev.map((i, idx) =>
          idx === index ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prev.filter((_, i) => i !== index);
      }
    });
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    setOrderSuccess(true);
    setCart([]);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  return {
    cart,
    addedItemId,
    orderSuccess,
    addToCart,
    removeFromCart,
    getTotal,
    handlePlaceOrder
  };
}
