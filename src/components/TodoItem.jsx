import { useContext, useState } from "react";
import { TodoContext } from "../context/context";

export default function TodoItem({ item }) {
  const [isEditing, setIsEditing] = useState(false);
  const context = useContext(TodoContext);

  return (
    <li>
      {!isEditing ? (
        <div className="item-group">
          <label className="checkbox-todo-name-wrapper">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={item.completed}
              onChange={(e) =>
                context.handleTodoUpdate({
                  ...item,
                  completed: e.target.checked,
                })
              }
            />
            <span
              className={
                item.completed ? "check-circle completed" : "check-circle"
              }
            >
              {item.completed && <span>✓</span>}
            </span>
            <span
              className={item.completed ? "todo-name completed" : "todo-name"}
            >
              {item.todoName}
            </span>
          </label>
          <div className="btns-wrapper">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
            <button
              onClick={() => context.handleTodoDelete(item.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={() => setIsEditing(false)} className="edit-form">
          <input
            className="edit-input"
            type="text"
            value={item.todoName}
            onChange={(e) =>
              context.handleTodoUpdate({
                ...item,
                todoName: e.target.value,
              })
            }
          />
          <button className="save-btn">Save</button>
        </form>
      )}
    </li>
  );
}
