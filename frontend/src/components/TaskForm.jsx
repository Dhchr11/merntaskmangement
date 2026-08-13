import { useState } from 'react';

function TaskForm({ addtask, isSubmitting }) {
  const [title, settitle] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    settitle(e.target.value);
    if (validationError) {
      setValidationError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setValidationError("Task title cannot be empty.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setValidationError("Task title must be at least 3 characters long.");
      return;
    }

    if (trimmedTitle.length > 50) {
      setValidationError("Task title cannot exceed 50 characters.");
      return;
    }

    if (isSubmitting) return;

    addtask(trimmedTitle);
    settitle("");
    setValidationError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type="text"
          placeholder="Enter task title (min 3 chars)..."
          value={title}
          disabled={isSubmitting}
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "addtask"}
        </button>
      </div>
      {validationError && (
        <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
          ⚠️ {validationError}
        </p>
      )}
    </form>
  );
}

export default TaskForm;
