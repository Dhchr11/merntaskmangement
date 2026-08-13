import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import './App.css'

function App() {
  const [tasks, settasks] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          settasks(data);
        } else {
          console.error("API response is not an array:", data);
          settasks([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        settasks([]);
      });
  }, [])

  const addtask = async (title) => {
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
        alert(newtask.error || newtask.message || "Error adding task");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const deletetask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE"
    });
    settasks(tasks.filter((item) => (item._id || item.id) !== id));
  }

  const toggleTask = async (id, currentCompleted) => {
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
    settasks(tasks.map((item) => ((item._id || item.id) === id ? updatedTask : item)));
  }

  return (
    <div>
      <TaskForm addtask={addtask} />
      {tasks.map((task) => (
        <TaskItem 
          key={task._id || task.id} 
          task={task} 
          toggleTask={toggleTask} 
          deletetask={deletetask} 
        />
      ))}
    </div>
  )
}

export default App
