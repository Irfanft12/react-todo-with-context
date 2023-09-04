import { useContext, useCallback } from "react";
import { TodoContext } from "../context/context";

export default function AddTodo() {
  const context = useContext(TodoContext);

  return (
    <form onSubmit={(e) => context.handleAddSubmit(e)} className="add-todo-form">
        <div className="input-group">
            <label>
                <span className="label">Add item</span>
                <input
                    type="text"
                    className="add-input"
                    value={context.todo}
                    onChange={(e) => context.handleTodoChange(e)}
                    autoFocus
                />
            </label>      
            <button className="add-btn">Add</button>
        </div>
        {context.addError && <p className="add-error">Type somthing in the box above</p>}
    </form>
  );
}
