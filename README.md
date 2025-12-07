# NexusStore — Plataforma E-commerce Full-Stack

O **NexusStore** é um e-commerce full-stack desenvolvido com **React.js** no frontend e **Java + Spring Boot** no backend.  
O projeto vai além do CRUD básico, oferecendo autenticação com níveis de acesso, carrinho persistente, gestão de estoque e categorias, além de uma interface moderna e responsiva.

---

## Índice

- [Visão Geral](#visão-geral)  
- [Funcionalidades](#funcionalidades)  
  - [Backend](#backend)  
  - [Frontend](#frontend)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Guia de Início](#guia-de-início)  
  - [Pré-requisitos](#pré-requisitos)  
  - [Configuração do Backend](#configuração-do-backend)  
  - [Configuração do Frontend](#configuração-do-frontend)  
- [Credenciais de Administrador](#credenciais-de-administrador)  
- [Endpoints da API](#endpoints-da-api)

---

## Visão Geral

O objetivo do NexusStore é oferecer uma base sólida e escalável para aplicações de e-commerce, com funcionalidades essenciais de um sistema real:

- Autenticação com níveis de acesso (Admin e Usuário)  
- Carrinho persistente  
- Gestão completa de produtos e categorias  
- Fluxo de checkout com manipulação transacional de estoque  
- Interface responsiva e moderna

---

## Funcionalidades

### Backend

- Segurança com autenticação e autorização via Spring Security, utilizando roles `USER` e `ADMIN`  
- CRUD completo de produtos, incluindo upload de imagens e associação a categorias  
- Estrutura de dados normalizada, com tabelas dedicadas para estoque e categorias  
- Carrinho persistente armazenado por usuário no banco de dados  
- Simulação de checkout com transações, validação de estoque e limpeza do carrinho  
- Data seeding automático para criar usuário admin e categorias padrão

---

### Frontend

- Interface moderna desenvolvida em React.js e estilizada com Tailwind CSS  
- Arquitetura baseada em componentes reutilizáveis e gerenciamento de estado com Context API (`AuthContext`, `CartContext`)  
- Navegação entre páginas com React Router DOM  
- Filtros de produtos por nome, categoria, ordenação por preço ou ordem alfabética  
- Dashboard administrativo protegido para gerenciamento de produtos  
- Notificações e feedback visual com React Hot Toast e NProgress

---

## Tecnologias Utilizadas

### Backend
- Java 17  
- Spring Boot  
- Spring Data JPA / Hibernate  
- Spring Security  
- PostgreSQL  
- Maven  

### Frontend
- React.js  
- JavaScript (ES6+)  
- Vite  
- Tailwind CSS  
- React Router DOM  
- NProgress, React Hot Toast, Lucide React

---

## Guia de Início

### Pré-requisitos

- JDK 17 ou superior  
- Maven  
- Node.js  
- npm ou Yarn  
- Instância do PostgreSQL

---

## Configuração do Backend

1. Acesse a pasta do backend:

   ```bash
   cd backend
   ```

2. Crie o banco de dados no PostgreSQL (exemplo: `db_loja`).

3. Configure as credenciais no arquivo:

   `src/main/resources/application.properties`

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/db_loja
   spring.datasource.username=SEU_USUARIO
   spring.datasource.password=SUA_SENHA
   ```

4. Execute o backend:

   ```bash
   mvn spring-boot:run
   ```

- Porta padrão: `http://localhost:8080`  
- O sistema cria automaticamente o usuário admin e categorias iniciais.

---

## Configuração do Frontend

1. Acesse a pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o projeto:

   ```bash
   npm run dev
   ```

- Porta padrão: `http://localhost:5173`

---

## Credenciais de Administrador

```
Usuário: admin
Senha: admin
```

---

## Endpoints da API

### Autenticação
- `POST /api/auth/register` — Registrar novo usuário

### Categorias
- `GET /api/categories` — Listar categorias

### Produtos
- `GET /produtos` — Listar produtos  
- `GET /produtos/{id}` — Buscar produto  
- `POST /produtos` — Criar produto (Admin)  
- `PUT /produtos/{id}` — Atualizar produto (Admin)  
- `DELETE /produtos/{id}` — Excluir produto (Admin)

### Carrinho
- `GET /api/cart` — Obter carrinho  
- `POST /api/cart/items` — Adicionar item  
- `PUT /api/cart/items/{productId}` — Atualizar quantidade  
- `DELETE /api/cart/items/{productId}` — Remover item

### Checkout
- `POST /api/checkout` — Processar checkout, validar estoque e limpar carrinho
