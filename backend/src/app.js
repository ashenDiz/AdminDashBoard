import express from "express";
import cors from "cors"; // Cross-Origin Resource Sharing: access control
import logger from "./utils/logger"; // Utils
import "dotenv/config";

import { connect } from "./utils/database.connection";

const app = express();
const PORT = process.env.PORT || "8090";

// Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Routes
app.get("/", (req, res, next) => {
  res.send("<h2> Recipe App</h2>");
  next();
});

import userRouter from "./api/routes/userRoutes";
import productRouter from "./api/routes/productR"; // Import product routes
import customerRouter from "./api/routes/customerR";
import invoicerouter from "./api/routes/invoiceRoutes";

app.use("/user", userRouter);
app.use("/api/products", productRouter); // Add product routes
app.use("/customer",customerRouter);
app.use("/api/invoice",invoicerouter);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is up and running on ${PORT}`);
  connect(); // Establish database connection
});
