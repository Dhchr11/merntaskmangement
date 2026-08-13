function TaskItem({ task, toggleTask, deletetask }) {
  const taskId = task._id || task.id;

  return (
    <div className={`group bg-slate-800/60 backdrop-blur-md border rounded-2xl p-4 mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-200 hover:shadow-lg ${
      task.completed 
        ? "border-emerald-900/40 bg-slate-800/30 opacity-80" 
        : "border-slate-700/60 hover:border-slate-600"
    }`}>
      {/* Title & Status indicator */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
          task.completed ? "bg-emerald-400 shadow-sm shadow-emerald-400" : "bg-amber-400 shadow-sm shadow-amber-400"
        }`} />
        <span className={`text-base font-medium break-words transition-all ${
          task.completed ? "line-through text-slate-400" : "text-slate-100"
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
              ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
              : "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30"
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
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all duration-200 flex items-center gap-1 cursor-pointer"
        >
          <span>🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
