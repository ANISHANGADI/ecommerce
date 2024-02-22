import express from "express";
const app = express();
import dotenv, { config } from "dotenv";
import "./config/dbConnect.js";
dotenv.config({ path: "backend/config/config.env" });

import errorMiddleWare from "./middlewares/error.js";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

//Connection to Database
connectDatabase();

app.use(express.json());
app.use(cookieParser());
//import product routes
import productRoutes from "./routes/products.js";
import { connectDatabase } from "./config/dbConnect.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orders.js"
 import paymentRoutes from "./middlewares/payment.js";
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1",orderRoutes)
app.use("/api/v1",paymentRoutes)
app.use(errorMiddleWare);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
