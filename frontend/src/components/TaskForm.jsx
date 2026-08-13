import { useState } from 'react';

function TaskForm({ addtask }) {
  const [title, settitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addtask(title);
    settitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => settitle(e.target.value)}
      />
      <button type="submit">addtask</button>
    </form>
  );
}

export default TaskForm;
