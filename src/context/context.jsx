import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid"

const TodoContext = createContext()

function TodoContextProvider(props) {
    const [todo, setTodo] = useState("")
    const [todoList, setTodoList] = useState(() => {
        const savedItems = localStorage.getItem("todos")
        if (savedItems) {
            return JSON.parse(savedItems)
        } else {
            return []
        }
    })
    const [addError, setAddError] = useState(false)

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList])

    function handleTodoChange(e) {
        setTodo(e.target.value)
        setAddError(false)
    }

    function handleAddSubmit(e) {
        e.preventDefault()
        if (todo.trim()) {
            
            setTodo("")
            setTodoList([
                {id: uuidv4(), todoName: todo, completed: false},
                ...todoList,
            ])
            console.log(todoList)
        } else {
            setAddError(true)
        }
    }

    function handleTodoDelete(id) {
        const newTodoList = todoList.filter(t => {
            return t.id !== id
        })

        setTodoList(newTodoList)
    }

    function handleTodoUpdate(nt) {
        const newTodoList = todoList.map(t => {
            if (t.id === nt.id) {
                return nt
            } else {
                return t
            }
        })

        setTodoList(newTodoList)
    }

    const value = {
        todo,
        handleTodoChange,
        handleAddSubmit,
        todoList,
        addError,
        handleTodoDelete,
        handleTodoUpdate
    }

    return (
        <TodoContext.Provider value={value}>
            {props.children}
        </TodoContext.Provider>
    )
}

export {TodoContext, TodoContextProvider}