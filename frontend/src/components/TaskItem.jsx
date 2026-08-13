function TaskItem({ task, toggleTask, deletetask, darkMode }) {
  const taskId = task._id || task.id;

  return (
    <div className={`group backdrop-blur-md border rounded-2xl p-4 mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-200 hover:shadow-lg ${
      task.completed 
        ? darkMode ? "border-emerald-900/40 bg-slate-800/30 opacity-80" : "border-emerald-200 bg-emerald-50/50 opacity-80"
        : darkMode ? "bg-slate-800/60 border-slate-700/60 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
    }`}>
      {/* Title & Status indicator */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
          task.completed ? "bg-emerald-500 shadow-sm shadow-emerald-500" : "bg-amber-500 shadow-sm shadow-amber-500"
        }`} />
        <span className={`text-base font-medium break-words transition-all ${
          task.completed 
            ? "line-through text-slate-400" 
            : darkMode ? "text-slate-100" : "text-slate-800"
        }`}>
          {task.title}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
        {/* Toggle Complete Button */}
        <button 
          onClick={() => toggleTask(taskId, task.completed)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
            task.completed
              ? darkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-200" : "bg-slate-200 hover:bg-slate-300 text-slate-700"
              : "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
          }`}
        >
          {task.completed ? (
            <>
              <span>↩</span>
              <span>Undo</span>
            </>
          ) : (
            <>
              <span>✓</span>
              <span>Complete</span>
            </>
          )}
        </button>

        {/* Delete Button */}
        <button 
          onClick={() => deletetask(taskId)}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-rose-500/20 transition-all duration-200 flex items-center gap-1 cursor-pointer"
        >
          <span>🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
