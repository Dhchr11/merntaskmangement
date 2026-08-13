import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import TaskFilter from './components/TaskFilter'
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService'
import './App.css'

function App() {
  const [tasks, settasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

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

  // Calculate Task Counter Statistics
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;

  // Filter & Search Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filterStatus === "all" ? true :
      filterStatus === "completed" ? task.completed :
      !task.completed;

    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>MERN Task Manager</h1>

      <TaskForm addtask={addtask} isSubmitting={isSubmitting} />

      {error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '8px', margin: '10px 0', borderRadius: '4px' }}>
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} style={{ marginLeft: '10px' }}>Dismiss</button>
        </div>
      )}

      <TaskFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        totalCount={totalCount}
        completedCount={completedCount}
        pendingCount={pendingCount}
      />
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p style={{ fontWeight: 'bold', color: '#666', marginTop: '20px' }}>Task not found.</p>
      ) : (
        filteredTasks.map((task) => (
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
