import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, settasks] = useState([])
  const [title, settitle] = useState("");

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

  const addtask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

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
        settitle("");
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
      <form onSubmit={addtask}>
        <input 
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <button type='submit'>addtask</button>
      </form>
      {tasks.map((task) => {
        const taskId = task._id || task.id;
        return (
          <div key={taskId}>
            <p>{task.title}</p>
            <button onClick={() => toggleTask(taskId, task.completed)}>
              {task.completed ? "Undo (Completed)" : "Mark Complete"}
            </button>
            <button onClick={() => deletetask(taskId)}>Delete</button>
          </div>
        );
      })}
    </div>
  )
}

export default App
