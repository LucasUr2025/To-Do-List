import { useState, useEffect } from 'react'
import './App.css'
import './index.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode'
  }, [darkMode])

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, done: false }])
      setNewTask('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const toggleTask = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].done = !updatedTasks[index].done
    setTasks(updatedTasks)
  }

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
  }

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (index) => {
    if (draggedIndex === null || tasks.length < 2) return
    const updatedTasks = [...tasks]
    const [movedTask] = updatedTasks.splice(draggedIndex, 1)
    updatedTasks.splice(index, 0, movedTask)
    setTasks(updatedTasks)
    setDraggedIndex(null)
  }

  return (
    <>
      {/* Botón flotante */}
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
          maxlength="105"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              draggable={tasks.length > 1}
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(index)}
              />
              <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
