import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import TaskFilter from './components/TaskFilter'
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService'

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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-slate-100">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-block p-2 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">
            ✨ MERN Stack Task Manager
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Organize Your Work
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Manage your daily tasks with real-time MongoDB synchronization.
          </p>
        </header>

        {/* Error Alert Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between shadow-lg backdrop-blur-md animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{error}</span>
            </div>
            <button 
              onClick={() => setError(null)} 
              className="ml-4 text-xs font-bold uppercase bg-rose-500/20 hover:bg-rose-500/30 px-3 py-1.5 rounded-lg border border-rose-500/30 transition-all cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Content Container */}
        <main className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
          {/* Add Task Form */}
          <TaskForm addtask={addtask} isSubmitting={isSubmitting} />

          {/* Search, Filter & Statistics */}
          <TaskFilter 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            totalCount={totalCount}
            completedCount={completedCount}
            pendingCount={pendingCount}
          />
          
          {/* Task List / Loading / Empty States */}
          <div className="space-y-2 mt-4">
            {loading ? (
              <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                <svg className="animate-spin h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm font-medium">Loading your tasks...</span>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="py-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
                <span className="text-4xl block mb-2">🔍</span>
                <p className="text-slate-300 font-semibold text-base">Task not found.</p>
                <p className="text-slate-500 text-xs mt-1">Try adjusting your search keyword or status filter.</p>
              </div>
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
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500 font-medium">
          MERN Task Manager • Powered by React, Vite, Express & MongoDB
        </footer>

      </div>
    </div>
  )
}

export default App
