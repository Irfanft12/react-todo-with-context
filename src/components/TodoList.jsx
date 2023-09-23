import { useContext } from "react"
import { TodoContext } from "../context/context"
import TodoItem from "./TodoItem"

export default function TodoList() {
    const {todoList, handleClearClick} = useContext(TodoContext)
    
    return (
        <>
            {
             todoList.length > 0 && <div className="clear-btn-wrapper">
                    <button className="clear-btn btn" onClick={handleClearClick}>Clear List</button> 
                </div>  
            }
            
            <ul>
                {todoList.map(item => {
                    return (
                        <TodoItem key={item.id} item={item} />
                    )
                })}
            </ul>
        </>
        
    )
}