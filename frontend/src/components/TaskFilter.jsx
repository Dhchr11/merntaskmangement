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
    <div style={{ margin: '15px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}>
      {/* Counters Bar */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', fontWeight: 'bold' }}>
        <span>Total: {totalCount}</span>
        <span style={{ color: 'green' }}>Completed: {completedCount}</span>
        <span style={{ color: 'orange' }}>Pending: {pendingCount}</span>
      </div>

      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '6px', flex: '1' }}
        />

        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '6px' }}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;
