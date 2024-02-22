import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateProfile,
  updatePassword,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import { authorizedRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { getAdminProducts } from "../controllers/productController.js";
//register new user
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/products").get(isAuthenticatedUser,authorizedRoles("admin"),getAdminProducts)
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), allUsers);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUser)
  .delete(isAuthenticatedUser,authorizedRoles("admin"),deleteUser);
export default router;
