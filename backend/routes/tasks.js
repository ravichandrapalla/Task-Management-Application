import express from 'express';
import { createTask, getAllTasks, getCurrentUserTasks, updateTask, deleteTask, deleteAllTasks } from '../controllers/task.js';

const router = express.Router();

router.get('/all', getAllTasks);
router.post('/', createTask);
router.put('/:taskId', updateTask);
router.get('/myTasks', getCurrentUserTasks);
router.delete('/deleteAll', deleteAllTasks);
router.delete('/:taskId', deleteTask);

export default router;