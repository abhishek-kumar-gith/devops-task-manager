import Task from '../models/task.model.js';

export const createTask = async (req, res) => {
  try {
    const { text } = req.body;

    const task = await Task.create({
      text
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create task',
      error: error.message
    });
  }
};




export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch tasks',
      error: error.message
    });
  }
};



export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update task',
      error: error.message
    });
  }
};





export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete task',
      error: error.message
    });
  }
};






