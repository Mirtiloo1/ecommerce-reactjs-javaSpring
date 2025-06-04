import { useCart } from '../contexts/CartContext';
import { Trash2, PlusCircle, MinusCircle } from 'lucide-react';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Seu Carrinho de Compras</h1>
        <p className="text-[#E0E0E0] text-lg">Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Seu Carrinho de Compras</h1>
      <div className="bg-[#34343C] rounded-lg shadow-xl p-4 sm:p-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-[#4A4A52] py-4 last:border-b-0">
            <div className="flex items-center mb-4 sm:mb-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white">{item.nome}</h2>
                <p className="text-sm text-[#B0B0B8]">Preço Un.: R$ {item.preco.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 bg-[#2A2A30] p-1 rounded-md">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[#5A5AFA] hover:text-[#7A7AFF] disabled:opacity-50" disabled={item.quantity <= 1}>
                  <MinusCircle size={20} />
                </button>
                <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#5A5AFA] hover:text-[#7A7AFF]">
                  <PlusCircle size={20} />
                </button>
              </div>
              <p className="text-md sm:text-lg font-semibold text-white w-24 text-right">
                R$ {(item.preco * item.quantity).toFixed(2).replace('.', ',')}
              </p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
            Total: R$ {getCartTotal().toFixed(2).replace('.', ',')}
          </h2>
          <button className="w-full sm:w-auto bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;