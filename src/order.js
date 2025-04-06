import { useState } from "react";

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

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return {
    cart,
    addedItemId,
    orderSuccess,
    setOrderSuccess,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    getTotal,
    clearCart,
  };
}
