import { useState } from 'react'


function App() {

	const [task, setTask ] = useState('')
	const [tasks, setTasks] = useState([])

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
	  <button onClick={() => {
  if (task.trim() === '') return

  setTasks([...tasks, { text: task, completed: false }])
  setTask('')
} }>Add Task</button>

	  <ul>
        {tasks.map((item, index) => (
         <li key={index}>

		<input
  type="checkbox"
  checked={item.completed}
  onChange={() => {
  setTasks(
    tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    )
  )
}}
/>

		<span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
  {item.text}
</span>
	<button onClick={() => setTasks(tasks.filter((_, i) => i !== index))}>
    Delete
  </button>
		
		</li>
         ))}
          </ul>

    </div>
  )
}

export default App
