import express from 'express';
import { createTask , getTasks , updateTask , deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

router.get('/', getTasks);

router.post('/', createTask);

router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;
