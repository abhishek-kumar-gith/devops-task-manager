import { useState ,  useEffect } from 'react'


function App() {

	const [task, setTask ] = useState('')
	const [tasks, setTasks] = useState([])
//useEffect
	  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/tasks`
        )

        const data = await response.json()

        setTasks(data)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }

    fetchTasks()
  }, [])

//handleaddTask
	const handleAddTask = async () => {
  if (task.trim() === '') return

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: task
        })
      }
    )

    const data = await response.json()

    setTasks([...tasks, data.task])
    setTask('')
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}


//handleToggleTask
const handleToggleTask = async (id, completed) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !completed
        })
      }
    )

    const data = await response.json()

    setTasks(
      tasks.map((task) =>
        task._id === id ? data.task : task
      )
    )
  } catch (error) {
    console.error('Failed to update task:', error)
  }
}





//detetask


const handleDeleteTask = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/${id}`,
      {
        method: 'DELETE'
      }
    )

    const data = await response.json()

    console.log(data)

    setTasks(
      tasks.filter((task) => task._id !== id)
    )
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}





  return (
    <div>
      <h1>DevOps Task Manager</h1>
      <p>Manage your tasks and learn DevOps by building.</p>

	<input
  type="text"
  placeholder="Enter a task"
  value={task}
  onChange={(e) => setTask(e.target.value)}
/>

<button onClick={handleAddTask}>
  Add Task
</button>


<ul>
  {tasks.map((item, index) => (
    <li key={item._id}>
	  <input
  type="checkbox"
  checked={item.completed}
  onChange={() =>
    handleToggleTask(item._id, item.completed)
  }
/>

		<span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
  {item.text}
</span>
	<button
  onClick={() => handleDeleteTask(item._id)}
>
  Delete
</button>
		
		</li>
         ))}
          </ul>

    </div>
  )
}

export default App
