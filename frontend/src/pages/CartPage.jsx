import { useCart } from "../contexts/CartContext";
import { Trash2, PlusCircle, MinusCircle, ShoppingBag } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import NProgress from "nprogress";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, fetchCart } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080/api/checkout";

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para finalizar a compra.");
      return;
    }

    const toastId = toast.loading("Processando sua compra...");
    NProgress.start();

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { Authorization: user.auth },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Falha ao processar a compra.");
      }

      toast.success("Compra realizada com sucesso!", { id: toastId });
      await fetchCart();
      navigate("/");
    } catch (error) {
      console.error("Erro no checkout:", error);
      toast.error(`Erro: ${error.message}`, { id: toastId });
    } finally {
      NProgress.done();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div
        className="container mx-auto p-8 text-center flex flex-col items-center justify-center"
        style={{ minHeight: "60vh" }}
      >
        <ShoppingBag className="text-[#4A4A52] mb-6" size={80} />
        <h1 className="text-3xl font-bold text-white mb-4">
          Seu carrinho está vazio
        </h1>
        <p className="text-[#B0B0B8] text-lg mb-8">
          Parece que você ainda não adicionou nenhum item.
        </p>
        <Link
          to="/"
          className="bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-3 px-8 rounded-md transition-colors text-lg"
        >
          Explorar Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Seu Carrinho de Compras
      </h1>
      <div className="bg-[#34343C] rounded-lg shadow-xl p-4 sm:p-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between border-b border-[#4A4A52] py-4 last:border-b-0"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.nome}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
              )}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                  {item.nome}
                </h2>
                <p className="text-sm text-[#B0B0B8]">
                  Preço Un.: R$ {item.preco.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 bg-[#2A2A30] p-1 rounded-md">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-[#5A5AFA] hover:text-[#7A7AFF] disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <MinusCircle size={20} />
                </button>
                <span className="text-white font-medium w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-[#5A5AFA] hover:text-[#7A7AFF]"
                >
                  <PlusCircle size={20} />
                </button>
              </div>
              <p className="text-md sm:text-lg font-semibold text-white w-24 text-right">
                R$ {(item.preco * item.quantity).toFixed(2).replace(".", ",")}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
            Total: R$ {getCartTotal().toFixed(2).replace(".", ",")}
          </h2>
          <button
            onClick={handleCheckout}
            className="w-full sm:w-auto bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
