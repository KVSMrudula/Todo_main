const API_URL = "http://localhost:5000/todos";

// ✅ Define type
export type Todo = {
  id?: number;
  title: string;
  completed: boolean;
};

// ✅ GET
export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

// ✅ POST
export const addTodo = async (todo: Todo): Promise<void> => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};

// ✅ PATCH
export const updateTodo = async (
  id: number,
  updated: Partial<Todo>
): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
};

// ✅ DELETE
export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};