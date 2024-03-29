import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [namaCustomer, setNamaCustomer] = useState("");

  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    let localCart = localStorage.getItem("cart");
    let localCustomer = localStorage.getItem("customer_detail");
    localCart = JSON.parse(localCart);
    localCustomer = JSON.parse(localCustomer);
    if (localCart) setItems(localCart);
    if (localCustomer) setNamaCustomer(localCustomer.nama_customer);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      setIsEmpty(items.length < 1);
      setTotalItems(items.reduce((prev, curr) => curr.quantity + prev, 0));
      setCartTotal(
        items.reduce(
          (prev, curr) =>
            curr.quantity * (curr.menu.price + curr.topping.price) + prev,
          0
        )
      );
    }
  }, [items, loading]);

  const saveCustomer = () => {
    let strNama = JSON.stringify({ nama_customer: namaCustomer });
    localStorage.setItem("customer_detail", strNama);
  };

  const addItem = (item, quantity = 1) => {
    const updated = [...items, { ...item, quantity: quantity }];
    setItems(updated);

    let stringCart = JSON.stringify(updated);
    localStorage.setItem("cart", stringCart);
  };

  const removeItem = (id) => {
    const filtered = items.filter((item) => item.menu.id != id);
    setItems(filtered);

    let stringCart = JSON.stringify(filtered);
    localStorage.setItem("cart", stringCart);
  };

  const updateItemQuantity = (id, quantity) => {
    const updated = items.map((item) => {
      if (item.menu.id == id) {
        return { ...item, quantity };
      }
      return item;
    });

    setItems(updated);

    let stringCart = JSON.stringify(updated);
    localStorage.setItem("cart", stringCart);
  };

  const updateItem = (id, property) => {
    const updated = items.map((item) => {
      if (item.menu.id == id) {
        return { ...item, ...property };
      }
      return item;
    });

    setItems(updated);

    let stringCart = JSON.stringify(updated);
    localStorage.setItem("cart", stringCart);
  };

  const inCart = (id) => {
    const found = items.find((item) => item.menu.id == id);
    if (!found) {
      return false;
    }
    return true;
  };

  const emptyCart = () => {
    setItems([]);

    localStorage.removeItem("cart");
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateItem,
    updateItemQuantity,
    totalItems,
    cartTotal,
    inCart,
    emptyCart,
    isEmpty,
    namaCustomer,
    setNamaCustomer,
    orderCode,
    setOrderCode,
    saveCustomer,
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
};
