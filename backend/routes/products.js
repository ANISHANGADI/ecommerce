import express from "express";
import {
  deleteProduct,
  getProductDetails,
  getProducts,
  newProduct,
  updateProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview
} from "../controllers/productController.js";
const router = express.Router();
import { isAuthenticatedUser, authorizedRoles } from "../middlewares/auth.js";
router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizedRoles("admin"), newProduct);
  
router.route("/products/:id").get(getProductDetails);
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProductDetails);
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
router
  .route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .put(isAuthenticatedUser, createProductReview);

router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteReview);

export default router;
