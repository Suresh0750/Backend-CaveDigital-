import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(authenticate); 

router.route("/")
  .post(createTask)
  .get(getTasks);

router.route("/:id")
  .put(updateTask)
  .delete(deleteTask);

export default router;
