function TaskFilter({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus, 
  totalCount, 
  completedCount, 
  pendingCount,
  darkMode
}) {
  return (
    <div className={`backdrop-blur-md border rounded-2xl p-4 mb-6 shadow-xl space-y-4 ${
      darkMode 
        ? "bg-slate-800/50 border-slate-700/60" 
        : "bg-white/70 border-slate-200/80 shadow-slate-200/50"
    }`}>
      {/* Counters Bar */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className={`border rounded-xl p-2.5 sm:p-3 transition-transform hover:scale-[1.02] ${
          darkMode ? "bg-slate-900/60 border-slate-700/50" : "bg-slate-50 border-slate-200"
        }`}>
          <span className={`block text-xs uppercase tracking-wider font-semibold mb-0.5 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>Total</span>
          <span className={`text-xl font-extrabold font-mono ${
            darkMode ? "text-slate-100" : "text-slate-800"
          }`}>{totalCount}</span>
        </div>
        <div className={`border rounded-xl p-2.5 sm:p-3 transition-transform hover:scale-[1.02] ${
          darkMode ? "bg-emerald-950/30 border-emerald-800/40" : "bg-emerald-50 border-emerald-200"
        }`}>
          <span className="block text-xs uppercase tracking-wider text-emerald-600 font-semibold mb-0.5">Completed</span>
          <span className="text-xl font-extrabold text-emerald-600 font-mono">{completedCount}</span>
        </div>
        <div className={`border rounded-xl p-2.5 sm:p-3 transition-transform hover:scale-[1.02] ${
          darkMode ? "bg-amber-950/30 border-amber-800/40" : "bg-amber-50 border-amber-200"
        }`}>
          <span className="block text-xs uppercase tracking-wider text-amber-600 font-semibold mb-0.5">Pending</span>
          <span className="text-xl font-extrabold text-amber-600 font-mono">{pendingCount}</span>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        {/* Search Input */}
        <div className="relative flex-1">
          <input 
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
              darkMode 
                ? "bg-slate-900/80 border-slate-700/80 text-slate-100 placeholder-slate-400" 
                : "bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400"
            }`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs rounded-full w-4 h-4 flex items-center justify-center cursor-pointer ${
                darkMode ? "bg-slate-700 text-slate-400 hover:text-slate-200" : "bg-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Tab Buttons */}
        <div className={`flex p-1 rounded-xl border self-start sm:self-auto ${
          darkMode ? "bg-slate-900/80 border-slate-700/80" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : darkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "completed"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : darkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "pending"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : darkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Pending ({pendingCount})
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskFilter;
