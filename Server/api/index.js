import express from "express";
import mongoose from "mongoose";
import rootRoutes from "./routes/routeIndex.js";
import dotenv from "dotenv";
import cors from "cors";
import { middleware } from "./middleware/middleware.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = process.env.CON_PORT || 3000;
app.listen(port, () => {
  console.log("Server Running");
});

app.all("*", middleware);
app.use(cors());
app.use(express.json());
app.use("/api", rootRoutes);
