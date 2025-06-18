import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  LogIn,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const itemCount = getCartItemCount();
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex">
      <div className="bg-[#34343C] w-full max-w-[800px] mx-auto rounded-bl-2xl rounded-br-2xl">
        <div className="flex items-center justify-between text-white py-4 px-4 sm:px-6">
          <div className="font-lilita font-regular text-2xl">
            <Link to="/">NexusStore</Link>
          </div>

          <div className="flex items-center gap-x-3 sm:gap-x-4">
            {isAdmin && (
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden md:flex bg-[#3E3E50] hover:bg-[#49495E] transition ease-in text-white font-medium py-2 px-3 sm:px-4 rounded-lg items-center gap-x-2"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
            )}

            <button
              onClick={() => navigate("/carrinho")}
              className="bg-[#3E3E50] hover:bg-[#49495E] transition ease-in text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center gap-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Carrinho</span>
              {itemCount > 0 && (
                <span className="bg-[#5A5AFA] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <button
                onClick={logout}
                className="bg-[#3E3E50] hover:bg-[#49495E] transition ease-in text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center gap-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#5A5AFA] hover:bg-[#4B4BE0] transition ease-in text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center gap-x-2"
              >
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            )}

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1 text-white hover:text-gray-300"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <ul className="flex flex-col gap-y-3 text-center">
              <li>
                <Link
                  to="/"
                  className="block py-2 hover:bg-[#49495E] rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    to="/dashboard"
                    className="block py-2 hover:bg-[#49495E] rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
