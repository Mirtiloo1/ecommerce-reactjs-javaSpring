import { Heart, Github, Linkedin, Mail, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#34343C] text-[#E0E0E0] py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="flex items-center">
                NexusStore
            </p>
            <p className="text-sm text-[#B0B0B8] mt-1">
              © {new Date().getFullYear()} Todos os direitos reservados
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/Mirtiloo1"
              className="text-[#B0B0B8] hover:text-[#5A5AFA] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/murilo-nunes-pimentel-831465292/"
              className="text-[#B0B0B8] hover:text-[#5A5AFA] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:murilonunes2101@gmail.com"
              className="text-[#B0B0B8] hover:text-[#5A5AFA] transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#4A4A52] text-center text-sm text-[#B0B0B8]">
          <p>
            Este é um projeto de demonstração. Dados fictícios para fins educacionais.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;