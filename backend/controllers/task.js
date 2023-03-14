import Task from "../models/Task.js";
import createError from "../utils/createError.js";

export const createTask = async (req, res, next) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
        completed: req.body.completed,
    });
    try {
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
    } catch (error) {
        return next(error);
    }
}

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } catch (error) {
      return next(error);
    }
}

export const getCurrentUserTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({user: req.user.id});
        return res.status(200).json(tasks);
    } catch (error) {
        return next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.taskId).exec();
        if(!task)
        {
            return next(createError({status: 404, message : "No Task found"}))
        }
        if(task.user.toString() !== req.user.id)
        {
            return next(createError({status : 401, message : "Task is created by different user"}))
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
            title : req.body.title,
            description : req.body.description,
            completed: req.body.completed
        }, {new : true});
        return res.status(200).json(updatedTask);
    } catch (error) {   
        return next(error);
    }
}

export const deleteTask = async(req, res, next)=> {
    try {
        const task = await Task.findById(req.params.taskId);
        if(!task)
        {
            return next(createError({status: 404, message : "No Task found"}))
        }
        if (task.user === req.user.id) {
            return next(createError({ status: 401, message: "this task is created by another user" }));
          }
        await Task.findByIdAndDelete(req.params.taskId);
        return res.status(200).json("Task is deleted Successfully");
    } catch (error) {
        return next(error);
    }
}

export const deleteAllTasks = async (req, res, next) => {
    try {
      await Task.deleteMany({ user: req.user.id });
      return res.json('All Tasks Deleted Successfully');
    } catch (err) {
      return next(err);
    }
  };