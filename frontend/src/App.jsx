import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService'
import './App.css'

function App() {
  const [tasks, settasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTasksData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTasks();
        if (Array.isArray(data)) {
          settasks(data);
        } else {
          settasks([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to connect to backend server");
        settasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksData();
  }, [])

  const addtask = async (title) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const newtask = await createTask(title);
      settasks((prev) => [...prev, newtask]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add task. Please check server connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const deletetask = async (id) => {
    setError(null);
    try {
      await deleteTask(id);
      settasks((prev) => prev.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete task. Please check server connection.");
    }
  }

  const toggleTask = async (id, currentCompleted) => {
    setError(null);
    try {
      const updatedTask = await updateTask(id, !currentCompleted);
      settasks((prev) => prev.map((item) => ((item._id || item.id) === id ? updatedTask : item)));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update task. Please check server connection.");
    }
  }

  return (
    <div>
      <TaskForm addtask={addtask} isSubmitting={isSubmitting} />

      {error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '8px', margin: '10px 0', borderRadius: '4px' }}>
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} style={{ marginLeft: '10px' }}>Dismiss</button>
        </div>
      )}
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found. Add your first task!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem 
            key={task._id || task.id} 
            task={task} 
            toggleTask={toggleTask} 
            deletetask={deletetask} 
          />
        ))
      )}
    </div>
  )
}

export default App
