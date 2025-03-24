import {Request,  Response ,NextFunction} from "express";
import { Task } from "../models/task.model";
import {HttpStatus} from "../utils/HttpStatusCode"
import { AuthenticatedRequest } from "../utils/customRequest";

// * Create Task
export const createTask = async (req: AuthenticatedRequest, res: Response,next:NextFunction):Promise<void> => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ userId: req.userId, title, description });
    res.status(HttpStatus.Created).json({success: true, message: "Task created successfully", task });
  } catch (error:any) {
    if(error.code === 11000){
      console.log('hello world');
      next(new Error('Task already exists'))
    }else{
      next(error)
    }
   
  }
};

// * Get All Tasks 
export const getTasks = async (req: AuthenticatedRequest, res: Response,next:NextFunction):Promise<void> => {
  try {
    
    let {searchText,page,limit=1} = req.query;
   console.log(req.userId,'req.userId')
    let query:any = {
      userId: req.userId
    };

    if(searchText && searchText.length){
      query.title = { $regex: searchText, $options: "i" };
    }
    query.userId = req.userId;
    const skip = (Number(page) - 1) * Number(limit);
    const tasks = await Task.find(query).skip(skip).limit(Number(limit));
    const totalTasks = await Task.countDocuments(query);
    res.json({success: true, message: "Tasks fetched successfully", data:{tasks,totalTasks}});
    } catch (error:unknown) {
        next(error)
    }
};

// * Update Task
export const updateTask = async (req: AuthenticatedRequest, res: Response,next:NextFunction):Promise<void> => {
  try {
    const { title, description } = req.body;
    const existingTask = await Task.findOne({ _id: req.params.id});
    if(!existingTask){
      res.status(HttpStatus.NotFound).json({success: false, message: "Task not found" });
      return
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id},
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask){
         res.status(HttpStatus.NotFound).json({success: false, message: "Task not found" });
         return
        }

    res.status(HttpStatus.Success).json({success: true, message: "Task updated successfully", task: updatedTask}  );
  } catch (error:any) {
    if(error.code === 11000){
      console.log('hello world');
      next(new Error('Task already exists'))
    }else{
      next(error)
    }
  }
};

// * Delete Task
export const deleteTask = async (req: AuthenticatedRequest, res: Response,next:NextFunction ):Promise<void> => {
  try {
    // const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });  
    const existingTask = await Task.findOne({ _id: req.params.id});
    if(!existingTask){
      res.status(HttpStatus.NotFound).json({ message: "Task not found" });
      return
    } 
    // if(existingTask.userId.toString() !== req.userId){
    //   res.status(HttpStatus.Forbidden).json({ message: "You are not authorized to delete this task" });
    //   return
    // }
    const task = await Task.findOneAndDelete({ _id: req.params.id});

    if (!task){
        res.status(HttpStatus.NotFound).json({ message: "Task not found" });
        return
    }

    res.status(HttpStatus.Success).json({success: true, message: "Task deleted successfully"});
  } catch (error:unknown) {
    next(error)
  }
};
