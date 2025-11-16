import { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const loadTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await api.post("/todos", { title });
    setTitle("");
    loadTodos();
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = async (id) => {
    await api.put(`/todos/${id}`, {
      title: editTitle,
      completed: false,
    });
    setEditingId(null);
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    loadTodos();
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold text-yellow-700 mb-10">
        TO-DO LIST APPLICATION
      </h1>

      {/* Input Row */}
      <div className="flex gap-4 mb-10">
        <input
          className="w-96 px-6 py-3 rounded-2xl bg-white shadow-sm text-lg outline-none"
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addTodo}
          className="px-8 py-3 bg-white rounded-2xl shadow text-lg font-bold hover:bg-gray-100"
        >
          add
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full flex flex-col items-center gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="w-[500px] bg-white rounded-2xl p-4 flex items-center gap-4 shadow"
          >
            {editingId === todo.id ? (
              <>
                <input
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-50 outline-none"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-green-200 rounded-xl font-semibold hover:bg-green-300"
                  onClick={() => saveEdit(todo.id)}
                >
                  save
                </button>
                <button
                  className="px-4 py-2 bg-red-200 rounded-xl font-semibold hover:bg-red-300"
                  onClick={() => setEditingId(null)}
                >
                  cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-left text-lg">{todo.title}</span>

                <button
                  className="px-4 py-2 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300"
                  onClick={() => startEditing(todo)}
                >
                  edit
                </button>

                <button
                  className="px-4 py-2 bg-red-300 rounded-xl font-semibold hover:bg-red-400"
                  onClick={() => deleteTodo(todo.id)}
                >
                  delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
