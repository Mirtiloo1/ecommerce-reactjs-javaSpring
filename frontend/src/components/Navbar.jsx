import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';  

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const itemCount = getCartItemCount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCartClick = () => {
    navigate('/carrinho');
  };

  return (
    <div className="flex">
      <div className="bg-[#34343C] w-full max-w-[600px] md:w-[800px] mx-auto rounded-bl-2xl rounded-br-2xl">
        <div className="flex items-center justify-between text-white py-4 px-4 sm:px-6">
          {/* ... Logo e Links de Navegação ... */}
          <div className="font-lilita font-regular text-2xl">
             <Link to="/">NexusStore</Link>
           </div>

          <div className="flex items-center gap-x-3 sm:gap-x-4">
            <button 
              onClick={handleCartClick}
              className="bg-[#3E3E50] hover:bg-[#49495E] transition ease-in text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center gap-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Carrinho</span>
              {itemCount > 0 && (
                <span className="bg-[#5A5AFA] text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1 text-white hover:text-gray-300"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
           <div className="md:hidden px-4 pb-4">
             <ul className="flex flex-col gap-y-3 text-center">
               <li><Link to="/" className="block py-2 hover:bg-[#49495E] rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
               <li><Link to="/Content" className="block py-2 hover:bg-[#49495E] rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Produtos</Link></li>
               <li><Link to="/EditarProdutos" className="block py-2 hover:bg-[#49495E] rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Editar Produtos</Link></li>
             </ul>
           </div>
         )}
      </div>
    </div>
  );
}

export default Navbar;