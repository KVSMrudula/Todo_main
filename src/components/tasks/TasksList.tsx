import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const API_URL = "http://localhost:5000/todos";

  // ✅ GET - Fetch todos
  const fetchTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ POST - Add todo
  const handleAdd = async () => {
    if (!newTask.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTask,
        completed: false,
      }),
    });

    setNewTask("");
    fetchTodos();
  };

  // ✅ PATCH - Update todo (toggle complete)
  const handleToggle = async (task: Task) => {
    await fetch(`${API_URL}/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    fetchTodos();
  };

  // ✅ DELETE - Remove todo
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>📝 Todo App</h2>

      {/* ✅ ADD TASK */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* ✅ TASK LIST */}
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {/* ✅ TOGGLE */}
            <span
              onClick={() => handleToggle(task)}
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none",
                flex: 1,
              }}
            >
              {task.title}
            </span>

            {/* ✅ DELETE */}
            <button onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};