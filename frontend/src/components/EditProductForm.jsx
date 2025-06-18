import React, { useState, useEffect } from "react";
import { UploadCloud, Check, Trash2, X } from "lucide-react";

function EditProductForm({ product, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    nome: product?.nome || "",
    descricao: product?.descricao || "",
    preco: product?.preco || "",
    quantidadeDisponivel: product?.quantidadeDisponivel || "",
    categoryId: product?.category?.id || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(product?.imageUrl || null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories");
        if (!response.ok) throw new Error("Falha ao buscar categorias");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("nome", formData.nome);
    productData.append("descricao", formData.descricao);
    productData.append("preco", formData.preco || 0);
    productData.append(
      "quantidadeDisponivel",
      formData.quantidadeDisponivel || 0
    );
    productData.append("categoryId", formData.categoryId);

    if (imageFile) {
      productData.append("imagem", imageFile);
    }

    onSave(productData, product.id);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-[#2A2A30] p-8 rounded-xl shadow-2xl w-full max-w-3xl text-white border border-[#4A4A52] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-6 text-center">
          {product.id ? "Editar Produto" : "Adicionar Novo Produto"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div className="w-48 h-48 bg-[#34343C] rounded-lg flex items-center justify-center border-2 border-dashed border-[#4A4A52] overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Pré-visualização"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <UploadCloud size={48} />
                    <p className="mt-2 text-sm">Sem imagem</p>
                  </div>
                )}
              </div>
              <label
                htmlFor="imagem"
                className="cursor-pointer bg-[#3E3E50] hover:bg-[#49495E] text-white font-medium py-2 px-4 rounded-lg transition-colors w-full text-center"
              >
                Selecionar Imagem
              </label>
              <input
                type="file"
                name="imagem"
                id="imagem"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required={!product.id}
              />
            </div>

            <div className="flex-grow space-y-4">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-[#B0B0B8] mb-1"
                >
                  Nome do Produto
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA]"
                />
              </div>

              <div>
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-[#B0B0B8] mb-1"
                >
                  Categoria
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA]"
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="descricao"
                  className="block text-sm font-medium text-[#B0B0B8] mb-1"
                >
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  id="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA]"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="preco"
                    className="block text-sm font-medium text-[#B0B0B8] mb-1"
                  >
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    name="preco"
                    id="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantidadeDisponivel"
                    className="block text-sm font-medium text-[#B0B0B8] mb-1"
                  >
                    Qtd. em Estoque
                  </label>
                  <input
                    type="number"
                    name="quantidadeDisponivel"
                    id="quantidadeDisponivel"
                    value={formData.quantidadeDisponivel}
                    onChange={handleChange}
                    step="1"
                    min="0"
                    required
                    className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-[#4A4A52]">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-5 bg-[#4A4A52] hover:bg-[#58585E] rounded-lg transition-colors font-semibold flex items-center gap-2"
            >
              <X size={18} /> Cancelar
            </button>
            {product && product.id && (
              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="py-2 px-5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-semibold flex items-center gap-2"
              >
                <Trash2 size={18} /> Excluir
              </button>
            )}
            <button
              type="submit"
              className="py-2 px-5 bg-[#5A5AFA] hover:bg-[#4B4BE0] rounded-lg transition-colors font-semibold flex items-center gap-2"
            >
              <Check size={18} />
              {product.id ? "Salvar Alterações" : "Adicionar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductForm;
