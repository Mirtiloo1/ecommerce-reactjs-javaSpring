
# NexusStore — Full-Stack E-commerce Platform

Welcome to **NexusStore**, a modern full-stack e-commerce application built with a **React.js** frontend and a robust **Java + Spring Boot** backend.

This project goes beyond a basic CRUD, implementing essential features of a real-world e-commerce platform, including role-based authentication (Admin & User), a persistent shopping cart, stock and category management, and a sleek, responsive user interface.

---

## ✨ Features

### 🔗 Backend

- **Robust Security:** Authentication and authorization with Spring Security, defining `USER` and `ADMIN` roles to protect API endpoints.
- **Product Management:** Full CRUD operations for products, including image uploads and category association.
- **Normalized Data Structure:** Stock and categories managed in dedicated tables for better scalability.
- **Persistent Shopping Cart:** Each user's shopping cart is stored in the database, enabling cross-device persistence.
- **Checkout Simulation:** A transactional checkout process that validates stock, decrements quantities, and clears the cart.
- **Data Seeding:** Automatically creates an admin user and default product categories on first run.

### 🎨 Frontend

- **Modern Reactive UI:** Built with React.js and styled with Tailwind CSS for a responsive and clean user experience.
- **Component-Based Architecture:** Clean code with reusable components and state management using React Context API (`AuthContext`, `CartContext`).
- **Client-Side Routing:** Smooth navigation between pages (Homepage, Product Detail, Cart) using React Router DOM.
- **Filtering & Searching:** Client-side searching by name, category filtering, and sorting by price or alphabetical order.
- **Admin Dashboard:** Protected route for administrators to manage products (add, edit, delete).
- **Enhanced UX:** Toast notifications (React Hot Toast) and a top-loading bar (NProgress) for feedback on user actions.

---

## 🛠️ Technologies Used

### Backend

- **Language:** Java 17
- **Framework:** Spring Boot
- **Data Persistence:** Spring Data JPA / Hibernate
- **Security:** Spring Security
- **Database:** PostgreSQL
- **Build Tool:** Maven

### Frontend

- **Language:** JavaScript (ES6+) with JSX
- **Framework:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **UI Components:** Lucide React (Icons), NProgress, React Hot Toast

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### ✅ Prerequisites

- JDK 17 or higher
- Apache Maven
- Node.js (LTS recommended)
- npm or Yarn
- A running PostgreSQL instance

---

### 🖥️ Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Configure the database:

- Create a PostgreSQL database (e.g., `db_loja`).
- Open `src/main/resources/application.properties` and update the credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/db_loja
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
```

3. Run the backend:

```bash
mvn spring-boot:run
```

- Backend runs on: `http://localhost:8080`
- Default admin user and categories are created on first startup.

---

### 🌐 Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the frontend:

```bash
npm run dev
```

- Frontend runs on: `http://localhost:5173`

---

## 🔐 Default Admin Credentials

```
Username: admin
Password: admin
```

---

## 📑 API Endpoints

### 🔸 Authentication

- `POST /api/auth/register` — Register a new user

### 🔸 Categories

- `GET /api/categories` — List all categories

### 🔸 Products

- `GET /produtos` — List all products
- `GET /produtos/{id}` — Get product by ID
- `POST /produtos` — (Admin) Create a product (multipart/form-data)
- `PUT /produtos/{id}` — (Admin) Update a product (multipart/form-data)
- `DELETE /produtos/{id}` — (Admin) Delete a product

### 🔸 Shopping Cart

- `GET /api/cart` — Get user's cart (Authenticated)
- `POST /api/cart/items` — Add item to cart (Authenticated)
- `PUT /api/cart/items/{productId}` — Update item quantity (Authenticated)
- `DELETE /api/cart/items/{productId}` — Remove item from cart (Authenticated)

### 🔸 Checkout

- `POST /api/checkout` — Process checkout, update stock, and clear the cart (Authenticated)
