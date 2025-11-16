import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db/db.js";
import tasksRouter from "./routes/tasks.js";
import authRouter from "./routes/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app() = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
// no se que estoy haciendo ayuda
