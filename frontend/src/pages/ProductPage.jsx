import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";
import NProgress from "nprogress";

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      NProgress.start();
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/produtos/${id}`);
        if (!response.ok) {
          throw new Error("Produto não encontrado");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
        navigate("/");
      } finally {
        setLoading(false);
        NProgress.done();
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) return null;
  if (error)
    return <div className="text-center text-red-500 py-10">Erro: {error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-8">
      {product && (
        <div className="bg-[#34343C] rounded-xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="md:w-1/2 bg-[#2A2A30] rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.nome}
              className="w-full h-full object-cover max-h-96"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/600x600?text=Imagem+Indisponível";
              }}
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {product.nome}
            </h1>
            <p className="text-2xl font-semibold text-[#5A5AFA] mb-6">
              R$ {product.preco?.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-[#B0B0B8] mb-6 leading-relaxed">
              {product.descricao}
            </p>

            <div className="mt-auto pt-6 border-t border-[#4A4A52]">
              <p
                className={`text-sm font-medium mb-4 ${
                  product.quantidadeDisponivel > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {product.quantidadeDisponivel > 0
                  ? `${product.quantidadeDisponivel} em estoque`
                  : "Indisponível"}
              </p>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                  max={product.quantidadeDisponivel}
                  className="w-20 bg-[#2A2A30] border border-[#4A4A52] rounded-md p-2.5 text-white text-center font-semibold"
                  disabled={product.quantidadeDisponivel === 0}
                />
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.quantidadeDisponivel === 0}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
