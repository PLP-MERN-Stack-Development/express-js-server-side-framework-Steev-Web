// ...existing code...
# Express.js RESTful API — Detailed README

This repository implements a small Express.js RESTful API for managing products. It demonstrates routing, middleware, database connection, validation patterns, and basic CRUD operations.

---

## Quick links to workspace files & symbols
- Server entry: [server.js](server.js)  
- Database connector: [`connectDB`](config/db.js) — [config/db.js](config/db.js)  
- Routes: [`productsRoutes`](routes/productsRoutes.js) — [routes/productsRoutes.js](routes/productsRoutes.js)  
- Mongoose model: [`Product`](models/products.js) — [models/products.js](models/products.js)  
- Sample seed/data: [products.json](products.json)  
- Environment example: [.env.example](.env.example)  
- Package manifest: [package.json](package.json)

---

## Overview
This API exposes CRUD endpoints for a product resource and connects to MongoDB using Mongoose. The project includes:
- A modular route file ([routes/productsRoutes.js](routes/productsRoutes.js))
- A Mongoose model with an auto-incrementing `id` ([models/products.js](models/products.js))
- A reusable DB connection function [`connectDB`](config/db.js)

API base path (mounted in [server.js](server.js)):
- /products

---

## Requirements
- Node.js (v18+ recommended)
- npm
- A MongoDB URI (set via .env: see [.env.example](.env.example))

---

## Install & Run

1. Install dependencies:
```sh
npm install
```

2. Copy environment example and set values:
```sh
cp .env.example .env
# Edit .env and set MONGO_URI and PORT
```

3. Start server (development with auto-reload):
```sh
npm run dev
```
or production:
```sh
npm start
```

The server entrypoint is [server.js](server.js). It loads environment variables, calls [`connectDB`](config/db.js), mounts the product routes ([routes/productsRoutes.js](routes/productsRoutes.js)), and starts the HTTP server.

---

## Environment variables
- MONGO_URI — MongoDB connection string (required)
- PORT — port to run server (defaults to 5000 in [server.js](server.js) if not provided)

See [.env.example](.env.example) for a template.

---

## API Endpoints

Base: /products

- GET /products
  - Description: Return list of all products.
  - Implementation: uses [`Product.find()`](models/products.js).
  - Example:
    ```sh
    curl http://localhost:3000/products
    ```

- GET /products/:id
  - Description: Return a product by its `id` (string/UUID or auto-incremented id depending on model).
  - Example:
    ```sh
    curl http://localhost:3000/products/1
    ```

- POST /products
  - Description: Create a product. Supports creating a single product (object) or many products (array). When posting an array, the route auto-generates UUIDs for each item before inserting.
  - Example (single):
    ```sh
    curl -X POST http://localhost:3000/products \
      -H "Content-Type: application/json" \
      -d '{"name":"Mouse","description":"Wireless mouse","price":25,"category":"electronics","inStock":true}'
    ```
  - Example (bulk):
    ```sh
    curl -X POST http://localhost:3000/products \
      -H "Content-Type: application/json" \
      -d '[{"name":"A","price":1},{"name":"B","price":2}]'
    ```

- PUT /products/:id
  - Description: Update a product by `id`. Returns updated document.
  - Example:
    ```sh
    curl -X PUT http://localhost:3000/products/1 \
      -H "Content-Type: application/json" \
      -d '{"price":29.99}'
    ```

- DELETE /products/:id
  - Description: Delete a product by `id`.
  - Example:
    ```sh
    curl -X DELETE http://localhost:3000/products/1
    ```

Notes:
- Route handlers and error codes are implemented in [routes/productsRoutes.js](routes/productsRoutes.js).
- Model structure and pre-save auto-increment logic live in [`Product`](models/products.js).

---

## Data model (summary)
See [`Product`](models/products.js) for the definitive schema. Key fields:
- id: String (unique) — auto-generated (UUID for bulk inserts or auto-increment counter for new saves)
- name: String (required)
- description: String
- price: Number (required)
- category: String
- inStock: Boolean (default true)
The repository also includes a small seed file [products.json](products.json).

---

## Database connection
- [`connectDB`](config/db.js) manages connecting to MongoDB using MONGO_URI.
- On startup, [server.js](server.js) calls [`connectDB`](config/db.js) before mounting routes.

---

## Middleware & Error Handling
- JSON body parsing: `express.json()` in [server.js](server.js).
- Routes implement try/catch and return appropriate HTTP status codes (400, 404, 500) in [routes/productsRoutes.js](routes/productsRoutes.js).
- You can add custom middleware (logging, authentication, validation) by creating functions and mounting them in [server.js](server.js) or on the router in [routes/productsRoutes.js](routes/productsRoutes.js).

Suggested middleware examples:
- Request logger: small middleware that logs method and path.
- Validation middleware: validate required fields before creating/updating.
- Error-handling middleware: centralized handler to format and log errors.

---

## Testing & Tools
- Use Postman / Insomnia / curl to exercise endpoints. The original README included a Postman collection (user's link).
- For unit/integration testing, add Jest or Mocha and export the Express app from [server.js](server.js) (already exported in this project).

---

## Contributing
- Create feature branches, maintain clear commit messages.
- Run linting and basic tests before opening PRs.

---

## Troubleshooting
- Common issue: MONGO_URI missing or invalid — verify [.env](.env) and network access to the DB.
- If models behave unexpectedly after schema changes, consider clearing test collections or updating migration logic.

---

## References
- Express: https://expressjs.com/  
- Mongoose: https://mongoosejs.com/


## My PostMan Documentation

- [PostMan Documentation]https://stephenadeniyi.postman.co/workspace/Stephen-Adeniyi's-Workspace~2c83b21e-d862-4d5e-82cd-55996db1a301/collection/44476639-99698bed-96d7-4514-9e45-8c00fa2b5d15?action=share&creator=44476639