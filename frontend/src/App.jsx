import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import './App.css'

function App() {
  const [tasks, settasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:5000/api/tasks")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || data.message || "Failed to fetch tasks");
        }
        if (Array.isArray(data)) {
          settasks(data);
        } else {
          settasks([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to connect to backend server");
        settasks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  const addtask = async (title) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });
      const newtask = await res.json();
      if (res.ok && newtask) {
        settasks((prev) => [...prev, newtask]);
      } else {
        setError(newtask.error || newtask.message || "Error adding task");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add task. Please check server connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const deletetask = async (id) => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        settasks((prev) => prev.filter((item) => (item._id || item.id) !== id));
      } else {
        setError(data.error || data.message || "Error deleting task");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete task. Please check server connection.");
    }
  }

  const toggleTask = async (id, currentCompleted) => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !currentCompleted,
        }),
      });
      const updatedTask = await res.json();
      if (res.ok) {
        settasks((prev) => prev.map((item) => ((item._id || item.id) === id ? updatedTask : item)));
      } else {
        setError(updatedTask.error || updatedTask.message || "Error updating task");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update task. Please check server connection.");
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
