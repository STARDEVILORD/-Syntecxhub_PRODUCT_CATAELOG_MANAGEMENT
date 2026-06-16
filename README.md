# Product Catalog Management API

A full-stack RESTful API and frontend dashboard for managing a product catalog. Built with Node.js, Express, and MongoDB Atlas, featuring JWT authentication, strict Joi data validation, and an interactive UI for seamless CRUD operations.

## 🌐 Live Demo

**Try it here:** [https://product-cataelog-management.onrender.com](https://product-cataelog-management.onrender.com)

Generate a test token and interact with the live MongoDB cloud database to instantly create, view, update, and delete products directly from your browser.

## 📌 Overview

This project demonstrates an end-to-end web application pipeline built in JavaScript. It:

1. Connects to a cloud-hosted **MongoDB Atlas** cluster for persistent data storage.
2. Secures API endpoints using **JSON Web Tokens (JWT)**.
3. Validates incoming request data (strict for creation, flexible for partial updates) using **Joi**.
4. Handles robust error catching and custom middleware routing.
5. Serves a custom **HTML/JS frontend dashboard** to test and visualize all API endpoints without needing third-party tools like Postman.

## 🚀 Features

* Complete RESTful API architecture (GET, POST, PUT, DELETE)
* Secure JWT-based route protection
* Intelligent data validation with Joi (supports partial PUT updates)
* Cloud database integration via Mongoose
* Interactive, responsive vanilla HTML/JS frontend dashboard
* Dynamic DOM manipulation (auto-refreshing tables and dropdowns)
* Blob-based HTML summary generation (opens data in new tabs without pop-up warnings)

## 🛠 Technologies Used

* Node.js
* Express.js
* MongoDB Atlas & Mongoose
* JSON Web Tokens (JWT)
* Joi
* HTML5 / CSS3 / Vanilla JavaScript
* Render (Cloud Hosting)

## 📂 Project Structure

```text
product-catalog-api/
├── public/                  # Frontend static files
│   └── index.html           # Interactive API testing dashboard
├── src/                     # Backend source code
│   ├── config/
│   │   └── db.js            # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── auth.js          # JWT verification
│   │   ├── errorHandler.js
│   │   └── validator.js     # Joi schemas
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   └── routes/
│       ├── authRoutes.js
│       └── productRoutes.js
├── .env                     # Environment variables (ignored by Git)
├── .gitignore
├── server.js                # Application entry point
├── package.json
└── README.md

```

## ⚙️ Setup

```bash
git clone https://github.com/YOUR_USERNAME/product-catalog-api.git
cd product-catalog-api

# Install dependencies
npm install

```

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/product_catalog?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key
DEFAULT_LIMIT=10

```

## ▶️ Usage

### Run the local development server

```bash
npm run dev

```

The server will start on `http://localhost:3000`. Open this URL in your browser to access the frontend dashboard, or make API requests directly to `http://localhost:3000/api/products`.

### Run for production

```bash
npm start

```

## 🧠 How It Works

1. **Authentication:** The user clicks "Get Test Token" on the frontend, hitting the `/api/auth/token` endpoint. The server generates and returns a JWT, which the browser attaches to the `Authorization` header of all subsequent requests.
2. **Validation:** When creating or updating a product, the data passes through `validator.js`. Creating requires all fields, while updating uses a flexible `.min(1)` schema allowing partial updates.
3. **Database Operations:** The Express controllers use Mongoose methods (`find`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`) to interact directly with the MongoDB Atlas cluster.
4. **Frontend Integration:** `index.html` uses the native `fetch()` API to communicate with the backend. Upon successful operations, the UI automatically triggers a GET request to refresh the product table and dropdown menus dynamically.

## 👤 Author

**Shriram Pawar**

B.Sc. Computer Science Graduate | Software Developer | Unity & Backend API Developer

## 📄 License

This project is licensed under the terms of the [MIT License](https://www.google.com/search?q=LICENSE).
