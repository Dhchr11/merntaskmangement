import { useState } from 'react';

function TaskForm({ addtask, isSubmitting }) {
  const [title, settitle] = useState("");
  const [validationError, setValidationError] = useState("");
  const maxLength = 50;

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

    if (trimmedTitle.length > maxLength) {
      setValidationError(`Task title cannot exceed ${maxLength} characters.`);
      return;
    }

    if (isSubmitting) return;

    addtask(trimmedTitle);
    settitle("");
    setValidationError("");
  };

  const charCount = title.length;
  const isNearLimit = charCount >= 45;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type="text"
          placeholder="Enter task title (min 3 chars)..."
          value={title}
          maxLength={maxLength}
          disabled={isSubmitting}
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "addtask"}
        </button>
      </div>

      {/* Live Character Counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <span style={{ 
          fontSize: '12px', 
          color: isNearLimit ? 'red' : '#666',
          fontWeight: isNearLimit ? 'bold' : 'normal'
        }}>
          📝 {charCount}/{maxLength} characters
        </span>
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
