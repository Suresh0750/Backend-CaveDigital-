import {  Response ,NextFunction} from "express";
import { Task } from "../models/task.model";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import {HttpStatus} from "../utils/HttpStatusCode"

// * Create Task
export const createTask = async (req: AuthenticatedRequest, res: Response,next:NextFunction):Promise<void> => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ userId: req.userId, title, description });
    res.status(HttpStatus.Created).json(task);
  } catch (error:unknown) {
   next(error)
  }
};

// * Get All Tasks 
export const getTasks = async (req: AuthenticatedRequest, res: Response,next:NextFunction):Promise<void> => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
    } catch (error:unknown) {
        next(error)
    }
};

//  * Get a Specific Task
export const getTaskById = async (req: AuthenticatedRequest, res: Response,next:NextFunction):Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
         res.status(HttpStatus.NotFound).json({ message: "Task not found" });
         return
        }
    res.json(task);
  } catch (error:unknown) {
    next(error)
  }
};

// Update Task
export const updateTask = async (req: AuthenticatedRequest, res: Response,next:NextFunction):Promise<void> => {
  try {
    const { title, description } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask){
         res.status(HttpStatus.NotFound).json({ message: "Task not found" });
         return
        }

    res.json(updatedTask);
  } catch (error:unknown) {
    next(error)
  }
};

// * Delete Task
export const deleteTask = async (req: AuthenticatedRequest, res: Response,next:NextFunction ):Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!task){
        res.status(HttpStatus.NotFound).json({ message: "Task not found" });
        return
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error:unknown) {
    next(error)
  }
};
