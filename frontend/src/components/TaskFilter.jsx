function TaskFilter({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus, 
  totalCount, 
  completedCount, 
  pendingCount 
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 mb-6 shadow-xl space-y-4">
      {/* Counters Bar */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-2.5 sm:p-3 transition-transform hover:scale-[1.02]">
          <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Total</span>
          <span className="text-xl font-extrabold text-slate-100 font-mono">{totalCount}</span>
        </div>
        <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-2.5 sm:p-3 transition-transform hover:scale-[1.02]">
          <span className="block text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-0.5">Completed</span>
          <span className="text-xl font-extrabold text-emerald-400 font-mono">{completedCount}</span>
        </div>
        <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-2.5 sm:p-3 transition-transform hover:scale-[1.02]">
          <span className="block text-xs uppercase tracking-wider text-amber-400 font-semibold mb-0.5">Pending</span>
          <span className="text-xl font-extrabold text-amber-400 font-mono">{pendingCount}</span>
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
            className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Tab Buttons */}
        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-700/80 self-start sm:self-auto">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "completed"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "pending"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "text-slate-400 hover:text-slate-200"
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
