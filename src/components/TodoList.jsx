import { useContext } from "react"
import { TodoContext } from "../context/context"
import TodoItem from "./TodoItem"

export default function TodoList() {
    const {todoList} = useContext(TodoContext)
    
    return (
        <ul>
            {todoList.map(item => {
                return (
                    <TodoItem key={item.id} item={item} />
                )
            })}
        </ul>
    )
}