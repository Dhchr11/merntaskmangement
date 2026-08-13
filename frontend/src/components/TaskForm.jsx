import { useState } from 'react';

function TaskForm({ addtask, isSubmitting }) {
  const [title, settitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;
    addtask(title);
    settitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Enter task title..."
        value={title}
        disabled={isSubmitting}
        onChange={(e) => settitle(e.target.value)}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "addtask"}
      </button>
    </form>
  );
}

export default TaskForm;
