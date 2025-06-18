import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const API_BASE_URL = "http://localhost:8080/api/cart";

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    try {
      const response = await fetch(API_BASE_URL, {
        headers: { Authorization: user.auth },
      });
      if (!response.ok) throw new Error("Falha ao buscar carrinho");
      const cartData = await response.json();
      setCartItems(
        cartData.items.map((item) => ({
          ...item.produto,
          quantity: item.quantity,
          cartItemId: item.id,
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      toast.error("Não foi possível carregar seu carrinho.");
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const getAuthHeader = () => ({
    Authorization: user.auth,
    "Content-Type": "application/json",
  });

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error(
        "Você precisa estar logado para adicionar itens ao carrinho."
      );
      return;
    }
    try {
      await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      toast.success(`${product.nome} adicionado ao carrinho!`);
      await fetchCart();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      toast.error("Erro ao adicionar item ao carrinho.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await fetch(`${API_BASE_URL}/items/${productId}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      toast.success(`Item removido do carrinho!`);
      await fetchCart();
    } catch (error) {
      console.error("Erro ao remover item:", error);
      toast.error("Erro ao remover item do carrinho.");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await fetch(`${API_BASE_URL}/items/${productId}`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify({ quantity: newQuantity }),
      });
      await fetchCart();
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      toast.error("Erro ao atualizar a quantidade.");
    }
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.preco * item.quantity,
      0
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartItemCount,
    getCartTotal,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
