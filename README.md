# Hlihaykwhlwiixsgaak-Website

## Project Coding Conventions

### Folder & File Naming

- **Folders and files:**  
  Use **lowercase** and **kebab-case**  
  _Examples:_  
  `user-controller.ts`, `auth-middleware.ts`, `image-uploader.ts`

- **Variables and functions:**  
  Use **camelCase**  
  _Examples:_  
  `handleLogin`, `updateImageSection`, `validateUser`

- **Classes, Types, Interfaces:**  
  Use **PascalCase**  
  _Examples:_  
  `UserModel`, `IImageData`, `AuthMiddleware`

- **Constants:**  
  Use **UPPER_SNAKE_CASE**  
  _Examples:_  
  `JWT_SECRET`, `MAX_IMAGE_SIZE`

---

### Code Style Guidelines

- Use **4 spaces** for indentation.
- Always end statements with **semicolons**.
- Use **single quotes** for strings.
- Prefer **async/await** over `.then()` for promises.
- Handle errors cleanly using `try/catch` or error middleware.
- Keep functions small and focused on a single task.
- Write modular, reusable code.
- Add JSDoc comments for complex logic or types.
- Keep types and interfaces organized (use `shared-types` folder if needed).
- Store secrets and configuration in the **root `.env` file**.
- Use environment variables in both frontend and backend via appropriate config.


---

## Folder Structure Overview

### Backend

- `src/controllers/`  
  Handles incoming requests and returns responses.

- `src/middleware/`  
  Custom Express middleware like authentication and error handling.

- `src/models/`  
  Database schemas and models (e.g., Mongoose schemas).

- `src/routes/`  
  Defines API endpoints and connects routes to controllers.

- `src/utils/`  
  Helper functions used throughout the backend.

- `src/app.ts`  
  Express app setup and middleware configuration.

- `src/server.ts`  
  Application entry point to start the server.

---

### Frontend

- `src/components/ui`
  Reusable Small React components E.g Forms, Heading with Texts etc.

- `src/components/`  
  Reusable React components. E.g HeroSection, ImageTextSection. A combination of small components

- `src/layouts/`  
  Page layout components (if any).

- `src/pages`
  Page components corresponding to routes or views.

- `src/servces`
  Code that contains fetching from backend. 

- `src/utils/`  
  Utility functions and helpers for frontend logic.

- `src/main.tsx`  
  React app entry point.

---

### Shared Types

- `shared-types/`  
  TypeScript types and interfaces shared between frontend and backend.

---

### Root

- `.env`  
  Environment variables used by both frontend and backend.

- `.gitignore`  
  Files and folders excluded from version control.


## How to Run the Project

### Install Dependencies

Run these commands separately in each folder:

```bash
cd folder_name
npm i


