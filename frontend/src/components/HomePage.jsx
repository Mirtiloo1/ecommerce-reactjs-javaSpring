import React, { useState, useEffect, useMemo } from "react";
import NProgress from 'nprogress';
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, Search, Tag, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import FilterBar from "./FilterBar";
import heroBanner from '../assets/banner-arraia-gamer.jpg';

function HomePage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:8080";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('alpha');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      NProgress.start();
      setLoading(true);
      setError(null);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/produtos`),
          fetch(`${API_BASE_URL}/api/categories`)
        ]);
        if (!productsResponse.ok) throw new Error(`Erro ao buscar produtos`);
        if (!categoriesResponse.ok) throw new Error(`Erro ao buscar categorias`);
        
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Não foi possível carregar os dados da página.");
      } finally {
        setLoading(false);
        NProgress.done();
      }
    };
    fetchProductsAndCategories();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let resultingProducts = [...products];

    if (categoryFilter !== 'all') {
      resultingProducts = resultingProducts.filter(p => p.category?.id == categoryFilter);
    }
    
    if (searchTerm) {
      resultingProducts = resultingProducts.filter(p =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    const sortableProducts = [...resultingProducts];
    switch (sortOrder) {
      case 'price-asc':
        return sortableProducts.sort((a, b) => a.preco - b.preco);
      case 'price-desc':
        return sortableProducts.sort((a, b) => b.preco - a.preco);
      case 'alpha':
      default:
        return sortableProducts.sort((a, b) => a.nome.localeCompare(b.nome));
    }
  }, [products, sortOrder, searchTerm, categoryFilter]);

  const handleBuyNow = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/carrinho');
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  if (loading) return null; 
  if (error) return <div className="text-center py-10 text-red-500"><p>Erro: {error}</p></div>;
  
  return (
    <div className="container mx-auto p-4 space-y-12">
      <div className="w-full max-h-80 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10 flex items-center justify-center">
        <img 
            src={heroBanner} 
            alt="Promoção Arraiá Gamer" 
            className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl font-bold text-white">Nossos Produtos</h2>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Pesquisar produtos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-[#2A2A30] border-2 border-[#4A4A52] rounded-full py-2 pl-10 pr-4 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA] transition"
            />
          </div>
        </div>
        
        <div className="bg-[#34343C] p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <SlidersHorizontal size={20} className="text-[#5A5AFA]" />
            <div className="relative flex items-center gap-2">
                <label htmlFor="category-select" className="text-[#B0B0B8] font-semibold text-sm">Categoria:</label>
                <select id="category-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none bg-[#2A2A30] border-2 border-[#4A4A52] rounded-md py-2 pl-3 pr-8 text-white font-semibold text-sm focus:ring-[#5A5AFA] focus:border-[#5A5AFA] transition cursor-pointer"
                >
                    <option value="all">Todas</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <ChevronDown size={16} />
                </div>
            </div>
          </div>
          <FilterBar currentSort={sortOrder} onSortChange={setSortOrder} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <Link to={`/produto/${product.id}`} key={product.id} className="bg-[#34343C] rounded-lg shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative">
              {product.category && (
                  <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 backdrop-blur-sm z-10">
                      <Tag size={12} />
                      {product.category.nome}
                  </div>
              )}
              <div className="aspect-square bg-[#2A2A30] flex items-center justify-center overflow-hidden">
                <img src={product.imageUrl} alt={product.nome} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/400x300?text=Imagem+Indisponível"; }}/>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-semibold text-white mb-2 truncate group-hover:text-[#5A5AFA] transition">{product.nome}</h2>
                <p className="text-[#B0B0B8] text-sm mb-3 h-10 overflow-hidden flex-grow">{product.descricao}</p>
                <div className="pt-2">
                  <p className="text-lg font-bold text-white mb-1">R$ {product.preco?.toFixed(2).replace(".", ",")}</p>
                  <p className={`text-sm font-medium ${product.quantidadeDisponivel > 0 ? "text-[#A0A0F0]" : "text-red-400"}`}>{product.quantidadeDisponivel > 0 ? `Estoque: ${product.quantidadeDisponivel}` : "Indisponível"}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                {product.quantidadeDisponivel > 0 ? (
                  <div className="flex gap-2 items-center">
                    <button onClick={(e) => handleBuyNow(product, e)} className="flex-1 bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-2 px-3 text-sm rounded-md transition-colors">Comprar</button>
                    <button onClick={(e) => handleAddToCart(product, e)} className="p-2 rounded-md transition-colors border border-[#4A4A52] hover:bg-[#4A4A52] text-white" title="Adicionar ao Carrinho"><ShoppingCart className="h-5 w-5" /></button>
                  </div>
                ) : ( <p className="text-center text-red-400 font-semibold">Produto Indisponível</p> )}
              </div>
            </Link>
          ))
        ) : (
            <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-400">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;