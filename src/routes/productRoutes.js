const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  validateProduct,
  validateProductUpdate,
} = require("../middleware/validator"); // <-- Added validateProductUpdate
const { protect } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, validateProduct, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, validateProductUpdate, updateProduct) // <-- Swapped to validateProductUpdate
  .delete(protect, deleteProduct);

module.exports = router;
