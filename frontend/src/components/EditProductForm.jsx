import React, { useState } from "react";

function EditProductForm({ product, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProductData = {
      ...formData,
      preco: parseFloat(formData.preco) || 0,
      quantidadeDisponivel: parseInt(formData.quantidadeDisponivel, 10) || 0,
    };
    onSave(updatedProductData);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-[#2A2A30] p-6 rounded-lg shadow-xl w-full max-w-lg text-white border border-[#4A4A52]">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          {formData.id ? "Editar Produto" : "Adicionar Novo Produto"}:{" "}
          {formData.id ? product.nome : ""}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-[#B0B0B8] mb-1"
            >
              Nome
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA] transition-colors"
            />
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
              rows="3"
              className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA] transition-colors"
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
                className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA] transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="quantidadeDisponivel"
                className="block text-sm font-medium text-[#B0B0B8] mb-1"
              >
                Qtd. Estoque
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
                className="w-full bg-[#34343C] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA] transition-colors"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-[#4A4A52] hover:bg-[#58585E] rounded-md transition-colors text-white font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-[#5A5AFA] hover:bg-[#4B4BE0] rounded-md transition-colors text-white font-semibold"
            >
              {formData.id ? "Salvar Alterações" : "Adicionar Produto"}
            </button>
            {product && product.id && (
              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="py-2 px-3 sm:px-4 bg-red-600 hover:bg-red-700 rounded-md transition-colors text-white font-semibold text-sm sm:text-base"
              >
                Excluir
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductForm;
