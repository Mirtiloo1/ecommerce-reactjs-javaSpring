# E-commerce Application: React Frontend & Spring Boot Backend

This repository contains a full-stack e-commerce application, developed with a React frontend and a Spring Boot backend, designed for product management and a basic shopping cart functionality.

## Project Structure

The project is organized into two main directories:

-   `backend/`: Contains the Spring Boot application responsible for the API, business logic, and data persistence.
-   `frontend/`: Contains the React application (built with Vite) that provides the user interface.

your-repository-name/
├── backend/
│   ├── src/
│   ├── pom.xml (or build.gradle)
│   └── ... (Spring Boot project files)
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ... (React project files)
├── .gitignore
└── README.md

## Technologies Used

### Backend (Spring Boot)

-   **Language:** Java 22.0.1
-   **Framework:** Spring Boot 3.4.5
-   **Database:** PostgreSQL
-   **ORM:** Spring Data JPA (with Hibernate 6.6.13.Final)
-   **Build Tool:** Maven (or Gradle, depending on your setup)
-   **API:** RESTful API for product management (CRUD operations).

### Frontend (React)

-   **Framework:** React.js (with Vite)
-   **Language:** JavaScript
-   **Styling:** Tailwind CSS (based on provided code snippets)
-   **State Management:** React Context API (for shopping cart)
-   **Routing:** React Router DOM (based on provided code snippets)
-   **HTTP Client:** Fetch API (or Axios, if you integrate it)
-   **UI Icons:** Lucide React

## Features

### Backend

-   **Product Management:** CRUD (Create, Read, Update, Delete) operations for products.
    -   Each product includes `id`, `name`, `description`, `price`, and `quantityAvailable`.
    -   Products are associated with `Categories` and have `Estoque` (Stock) managed separately.
-   **Database Integration:** Persistence of products, categories, and stock in a PostgreSQL database.
-   **CORS Configuration:** Enabled for frontend-backend communication.

### Frontend

-   **Product Listing:** Displays available products on the homepage.
-   **Add/Edit Product Forms:** Allows creation of new products and editing of existing ones.
-   **Shopping Cart:**
    -   Add products to cart.
    -   Adjust quantities in cart.
    -   Remove items from cart.
    -   Calculates total cart value.
    -   Cart data is persisted in local storage.
-   **Responsive Design:** Utilizes Tailwind CSS for a responsive layout.
-   **Navigation:** Basic navigation between Home and Cart pages.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Java Development Kit (JDK) 22 or higher
-   Apache Maven (if using Maven) or Gradle (if using Gradle)
-   Node.js (LTS version recommended)
-   npm (Node Package Manager) or Yarn
-   PostgreSQL database server
-   Docker Desktop (if you choose to run backend via Docker, or if Render requires it for deploy)

### 1. Backend Setup (Spring Boot)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
    cd your-repository-name/backend
    ```
    (Replace `your-username` and `your-repository-name` with your actual GitHub details).
2.  **Database Configuration:**
    -   Create a PostgreSQL database (e.g., `db_loja`).
    -   Update `src/main/resources/application.properties` with your PostgreSQL database credentials:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/db_loja
        spring.datasource.username=your_db_username
        spring.datasource.password=your_db_password
        spring.datasource.driver-class-name=org.postgresql.Driver
        spring.jpa.hibernate.ddl-auto=update # Use 'update' for development, consider 'none' or 'validate' for production with migrations.
        spring.jpa.show-sql=true
        ```
    -   Ensure your `Produto.java` has `@GeneratedValue(strategy = GenerationType.IDENTITY)` for `id` to allow auto-increment, and your database table `produto`'s `id` column is set up as `BIGSERIAL PRIMARY KEY`.
3.  **CORS Configuration:**
    -   Verify `src/main/java/br/universidade/loja/configuration/CorsConfiguration.java` allows requests from your frontend's development URL (e.g., `http://localhost:5173`).
        ```java
        // ...
        .allowedOrigins("http://localhost:5173") // Adjust if your React dev server uses a different port
        // ...
        ```
4.  **Run the Backend:**
    -   Open your terminal in the `backend/` directory.
    -   Execute the Spring Boot application:
        ```bash
        mvn spring-boot:run
        # Or if using Gradle:
        # gradlew bootJar
        # java -jar build/libs/*.jar
        ```
    -   The backend API should be running on `http://localhost:8080`.

### 2. Frontend Setup (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # Or: yarn install
    ```
3.  **Run the Frontend:**
    ```bash
    npm run dev
    # Or: yarn dev
    ```
    The React application should now be running on `http://localhost:5173` (or a similar port).

## API Endpoints (Backend)

The backend provides the following RESTful API endpoints:

-   `GET /produtos`: Get a list of all products (including associated stock quantity and category name).
-   `POST /produtos`: Create a new product (requires JSON body with `nome`, `descricao`, `preco`, `quantidadeDisponivel`, `categoriaId`).
-   `GET /produtos/{id}`: Get details of a specific product by ID.
-   `PUT /produtos/{id}`: Update an existing product by ID (requires JSON body similar to POST).
-   `DELETE /produtos/{id}`: Delete a product by ID.
-   `GET /categorias`: Get a list of all categories (if you implement a `CategoriaController`).

## Contributing

Feel free to fork the repository, create a new branch, and submit pull requests.
