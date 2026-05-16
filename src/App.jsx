import { useState, useEffect } from 'react'
import './App.css'
import './index.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode'
  }, [darkMode])

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false, isDeleting: false }])
      setNewTask('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    )
    setTasks(updatedTasks)
  }

  const deleteTask = (id) => {
    // 1. Activamos la clase de desvanecimiento
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isDeleting: true } : task
    ))

    // 2. Esperamos 250ms a que termine la animación antes de borrar el item del estado
    setTimeout(() => {
      setTasks(currentTasks => currentTasks.filter(task => task.id !== id))
    }, 250);
  }

  return (
    <>
      <button 
        className="toggle-theme-btn" 
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      <div className='ToDo'>
        <h1>To-Do List</h1>
        <input
          type="text"
          placeholder="Add a new task..."
          maxLength="105"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <ul>
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={`task-item ${task.isDeleting ? 'task-item-exit' : ''}`}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
