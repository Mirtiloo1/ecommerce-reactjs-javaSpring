import React, { useState, useEffect } from "react";
import NProgress from 'nprogress';
import toast from 'react-hot-toast';
import { Pencil, Plus, Tag } from "lucide-react";
import EditProductForm from "../components/EditProductForm";
import { useAuth } from "../contexts/AuthContext";

function DashboardPage() {
  const { user } = useAuth();
  const API_BASE_URL = "http://localhost:8080";

  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsFromApi = async () => {
    setLoading(true);
    NProgress.start();
    try {
      const response = await fetch(`${API_BASE_URL}/produtos`);
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
      NProgress.done();
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  const getAuthHeader = () => (user ? { 'Authorization': user.auth } : {});

  const handleSaveProduct = async (formData, productId) => {
    const isCreating = !productId;
    const toastId = toast.loading(isCreating ? 'Adicionando produto...' : 'Salvando alterações...');
    NProgress.start();
    try {
      const method = isCreating ? "POST" : "PUT";
      const url = isCreating ? `${API_BASE_URL}/produtos` : `${API_BASE_URL}/produtos/${productId}`;

      const response = await fetch(url, {
        method,
        headers: {
          ...getAuthHeader() 
        },
        body: formData,
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(errBody || `Falha ao salvar produto`);
      }
      
      toast.success('Produto salvo com sucesso!', { id: toastId });
      setProductToEdit(null);
      await fetchProductsFromApi();
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      toast.error(`Erro: ${err.message}`, { id: toastId });
    } finally {
      NProgress.done();
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    
    const toastId = toast.loading('Excluindo produto...');
    NProgress.start();
    try {
      const response = await fetch(`${API_BASE_URL}/produtos/${productId}`, {
        method: "DELETE",
        headers: getAuthHeader()
      });

      if (!response.ok && response.status !== 204) {
         const errBody = await response.text();
        throw new Error(errBody || `Falha ao excluir produto`);
      }

      toast.success('Produto excluído com sucesso!', { id: toastId });
      setProductToEdit(null);
      await fetchProductsFromApi();
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      toast.error(`Erro: ${err.message}`, { id: toastId });
    } finally {
      NProgress.done();
    }
  };
  
  const handleOpenAddForm = () => {
    setProductToEdit({ nome: "", descricao: "", preco: "", quantidadeDisponivel: "" });
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
  };

  const handleCloseEditForm = () => {
    setProductToEdit(null);
  };

  if (loading) return null;
  
  if (error) {
    return (
        <div className="text-center py-10 text-red-500">
            <p>Erro: {error}</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Gerenciar Produtos</h1>
        <button
          onClick={handleOpenAddForm}
          className="bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Adicionar Produto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-[#34343C] rounded-lg shadow-xl overflow-hidden flex flex-col justify-between group relative">
            {product.category && (
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 backdrop-blur-sm z-10">
                    <Tag size={12} />
                    {product.category.nome}
                </div>
            )}
            <div className="aspect-square bg-[#2A2A30] flex items-center justify-center overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.nome} 
                className="h-full w-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x300?text=Imagem+Indisponível"; }}
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-2 truncate">{product.nome}</h2>
              <p className="text-lg font-bold text-white mb-1">R$ {product.preco?.toFixed(2).replace(".", ",")}</p>
              <p className={`text-sm font-medium ${product.quantidadeDisponivel > 0 ? "text-[#A0A0F0]" : "text-red-400"}`}>
                {product.quantidadeDisponivel > 0 ? `Estoque: ${product.quantidadeDisponivel}` : "Indisponível"}
              </p>
            </div>
             <div className="p-6 pt-0 mt-auto">
              <button
                onClick={() => handleEditClick(product)}
                className="w-full flex justify-center items-center gap-x-2 p-2 rounded-md transition-colors duration-200 border border-[#5A5AFA] text-[#5A5AFA] hover:bg-[#5A5AFA] hover:text-white"
                title="Editar Produto"
              >
                <Pencil className="h-5 w-5" />
                <span>Editar</span>
              </button>
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
  )
}

export default DashboardPage;