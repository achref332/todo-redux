import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, editTodo } from "./store";

function App() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAdd = () => {
    if (desc.trim() === "") return;
    const newTodo = { id: Date.now(), description: desc, isDone: false };
    dispatch(addTodo(newTodo));
    setDesc("");
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (id) => {
    const newDesc = prompt("Modifier la tâche :");
    if (newDesc) {
      dispatch(editTodo({ id, description: newDesc }));
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "done") return todo.isDone;
    if (filter === "notDone") return !todo.isDone;
    return true;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo Redux</h1>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={handleAdd}>Ajouter</button>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setFilter("all")}>Toutes</button>
        <button onClick={() => setFilter("done")}>Effectuées</button>
        <button onClick={() => setFilter("notDone")}>Non effectuées</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => handleToggle(todo.id)}
              style={{ textDecoration: todo.isDone ? "line-through" : "none", cursor: "pointer" }}
            >
              {todo.description}
            </span>
            <button onClick={() => handleEdit(todo.id)}>Modifier</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
