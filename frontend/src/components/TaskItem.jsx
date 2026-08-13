function TaskItem({ task, toggleTask, deletetask }) {
  const taskId = task._id || task.id;

  return (
    <div>
      <p>{task.title}</p>
      <button onClick={() => toggleTask(taskId, task.completed)}>
        {task.completed ? "Undo (Completed)" : "Mark Complete"}
      </button>
      <button onClick={() => deletetask(taskId)}>Delete</button>
    </div>
  );
}

export default TaskItem;
