import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import EditProductForm from "./EditProductForm";
import { useCart } from "../contexts/CartContext";

function HomePage() {
  const { addToCart } = useCart();

  const API_BASE_URL = "http://localhost:8080";

  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Funções de interação com a API ---

  const fetchProductsFromApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/produtos`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  const handleSaveProduct = async (formData) => {
    try {
      const method = formData.id ? "PUT" : "POST";
      const url = formData.id
        ? `${API_BASE_URL}/produtos/${formData.id}`
        : `${API_BASE_URL}/produtos`;

      const dataToSend = {
        nome: formData.nome,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        quantidadeDisponivel: parseInt(formData.quantidadeDisponivel, 10),
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: "Erro desconhecido" }));
        throw new Error(`Falha ao salvar produto: ${errorBody.message || response.statusText}`);
      }

      fetchProductsFromApi();
      setProductToEdit(null);
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      alert(`Erro ao salvar produto: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/produtos/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status !== 204) {
            const errorBody = await response.json().catch(() => ({ message: "Erro desconhecido" }));
            throw new Error(`Falha ao excluir produto: ${errorBody.message || response.statusText}`);
        }
      }

      fetchProductsFromApi();
      setProductToEdit(null);
      console.log(`Produto com ID ${productId} foi excluído.`);
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      alert(`Erro ao excluir produto: ${err.message}`);
    }
  };

  // --- Funções de controle de UI (formulário) ---

  const handleOpenAddForm = () => {
    setProductToEdit({
      nome: "",
      descricao: "",
      preco: "",
      quantidadeDisponivel: "",
    });
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
  };

  const handleCloseEditForm = () => {
    setProductToEdit(null);
  };

  // --- Renderização Condicional ---

  if (loading) {
    return (
      <div className="text-center py-10 text-white">Carregando produtos...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">Erro: {error}</div>
    );
  }

  if (products.length === 0 && !productToEdit && !loading && !error) {
    return (
      <div className="text-center py-10">
        <p className="text-[#E0E0E0] mb-4">Nenhum produto encontrado. Adicione um novo!</p>
        <button
          onClick={handleOpenAddForm}
          className="bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Adicionar Primeiro Produto
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center text-white">
          Nossos Produtos
        </h1>
        <button
          onClick={handleOpenAddForm}
          className="bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Adicionar Produto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#34343C] rounded-lg shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="p-6">
              <h2
                className="text-xl font-semibold text-white mb-2 truncate"
                title={product.nome}
              >
                {product.nome}
              </h2>
              <p className="text-[#B0B0B8] text-sm mb-3 h-10 overflow-hidden">
                {product.descricao}
              </p>
              <p className="text-lg font-bold text-white mb-1">
                R$ {product.preco?.toFixed(2).replace(".", ",")}
              </p>
              <p
                className={`text-sm font-medium ${
                  product.quantidadeDisponivel > 0
                    ? "text-[#A0A0F0]"
                    : "text-red-400"
                }`}
              >
                {product.quantidadeDisponivel > 0
                  ? `Estoque: ${product.quantidadeDisponivel}`
                  : "Indisponível"}
              </p>
            </div>
            <div className="p-6 pt-0 mt-auto">
              <div className="flex gap-2 items-center">
                {product.quantidadeDisponivel > 0 && (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-2 px-3 text-sm rounded-md transition-colors duration-150"
                  >
                    Adicionar ao Carrinho
                  </button>
                )}
                <button
                  onClick={() => handleEditClick(product)}
                  className={`p-2 rounded-md transition-colors duration-150 border border-[#4A4A52] hover:bg-[#4A4A52] text-white ${
                    product.quantidadeDisponivel <= 0
                      ? "w-full flex justify-center gap-x-2 items-center text-sm"
                      : ""
                  }`}
                  title="Editar Produto"
                >
                  <Pencil className="h-5 w-5" />
                  {product.quantidadeDisponivel <= 0 && <span>Editar</span>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productToEdit && (
        <EditProductForm
          product={productToEdit}
          onClose={handleCloseEditForm}
          onSave={handleSaveProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}

export default HomePage;