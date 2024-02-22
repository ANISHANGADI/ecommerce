import express from "express";
const router = express.Router();
import { isAuthenticatedUser, authorizedRoles } from "../middlewares/auth.js";
import {
  allOrders,
  deleteOrder,
  getOrderDetails,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/ordersControllers.js";
router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/profile/orders").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders/:id")
  .get(isAuthenticatedUser,authorizedRoles("admin"),allOrders)
  .put(isAuthenticatedUser,authorizedRoles("admin"),updateOrder)
  .delete(isAuthenticatedUser,authorizedRoles("admin"),deleteOrder)
export default router;
