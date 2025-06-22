import express from "express";
import dotenv from "dotenv";
import { ErrorHandler, NotFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
dotenv.config();
import cookieParser from "cookie-parser";
const port = process.env.PORT || 3000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("server is ready"));
}
app.use(NotFound);
app.use(ErrorHandler);
app.listen(port, () => console.log(`Server is running on port ${port}`));
