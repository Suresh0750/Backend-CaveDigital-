import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth.routes";
import taskRoutes from './routes/task.routes';
import { errorHandler } from "./middlewares/error.middleware";
import { PORT } from "./utils/constants";

dotenv.config();

const app = express();

// * Middleware
app.use(cors());
app.use(express.json());


// * Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// * Global Error Handler
app.use(errorHandler);


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
