import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import requestRoutes from "./routes/requestRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api", requestRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
