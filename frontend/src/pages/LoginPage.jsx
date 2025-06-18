import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex justify-center items-center pt-10 pb-10">
      <div className="w-full max-w-sm bg-[#34343C] p-8 rounded-lg shadow-xl">
        <div className="text-center mb-8">
          <h1 className="font-lilita font-regular text-4xl text-white">
            NexusStore
          </h1>
          <p className="text-[#B0B0B8] mt-2">Faça login para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#B0B0B8] mb-1">
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-[#2A2A30] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#B0B0B8] mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#2A2A30] border border-[#4A4A52] rounded-md p-2.5 text-white focus:ring-[#5A5AFA] focus:border-[#5A5AFA]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5A5AFA] hover:bg-[#4B4BE0] text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-sm text-[#B0B0B8] mt-6">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#5A5AFA] hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
