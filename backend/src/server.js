
import connectDB from './config/db.js';
import taskRoutes from './routes/task.routes.js';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'DevOps Task Manager API is running'
  });
});




const PORT = process.env.PORT;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
