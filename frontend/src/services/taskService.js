const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Failed to fetch tasks");
  }
  return data;
};

export const createTask = async (title) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Failed to create task");
  }
  return data;
};

export const updateTask = async (id, completed) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Failed to update task");
  }
  return data;
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Failed to delete task");
  }
  return data;
};
