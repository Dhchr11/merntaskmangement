import { useState } from 'react';

function TaskForm({ addtask, isSubmitting, darkMode }) {
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
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input 
            type="text"
            placeholder="What needs to be done? (min 3 chars)..."
            value={title}
            maxLength={maxLength}
            disabled={isSubmitting}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner disabled:opacity-50 ${
              darkMode 
                ? "bg-slate-800/80 border-slate-700/80 text-slate-100 placeholder-slate-400" 
                : "bg-white border-slate-300 text-slate-800 placeholder-slate-400 shadow-slate-200/50"
            }`}
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <span className="text-xl">+</span>
              <span>Add Task</span>
            </>
          )}
        </button>
      </div>

      {/* Live Character Counter & Validation */}
      <div className="flex items-center justify-between mt-2 px-1 text-xs">
        <div>
          {validationError && (
            <span className="text-rose-500 font-medium flex items-center gap-1 animate-pulse">
              ⚠️ {validationError}
            </span>
          )}
        </div>
        <span className={`font-mono transition-colors ${
          isNearLimit ? 'text-rose-500 font-bold' : darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          📝 {charCount}/{maxLength}
        </span>
      </div>
    </form>
  );
}

export default TaskForm;
