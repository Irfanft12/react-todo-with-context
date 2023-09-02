import { useContext } from "react"
import { TodoContext } from "../context/context"

export default function TodoCount() {
    const context = useContext(TodoContext)

    return (
        <div className="count-wrapper">
            <div className="total-count">
                Total: <b>{context.todoList.length}</b>
            </div>
            <div className="completed-count">Completed: {context.completedList.length}</div>
            <div className="completed-count">Incomplete: {context.incompleteList.length}</div>

        </div>
    )
}