import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const TodoContext = createContext()

function TodoContextProvider(props) {
    const [todo, setTodo] = useState("")
    const [completedList, setCompletedList] = useState([])
    const [incompleteList, setIncompleteList] = useState([])

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

        const completedTodos = todoList.filter(t => {
            return t.completed
        })
        setCompletedList(completedTodos)

        const incompleteTodos = todoList.filter(t => {
            return !t.completed
        })
        setIncompleteList(incompleteTodos)
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

    function handleTodoDelete(item) {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure?',
            html: `<span>You won't be able to revert <b>${item.todoName}</b>!</span>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then(result => {
            if (result.isConfirmed) {
                const newTodoList = todoList.filter(t => {
                    return t.id !== item.id
                })
                setTodoList(newTodoList)
                MySwal.fire({
                    title:  'Deleted!',
                    html:  `<b>${item.todoName}</b> has been deleted.</b>`,
                    icon: 'success'
                })
            }
          })
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

    function handleClearClick() {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure?',
            html: `<span>You won't be able to revert <b>${todoList.length} items</b>!</span>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete all!'
          }).then(result => {
            if (result.isConfirmed) {
                setTodoList([])
                MySwal.fire({
                    title:  'Deleted!',
                    html:  `<b>${todoList.length} items</b> has been deleted.</b>`,
                    icon: 'success'
                })
            }
          })
    }

    const value = {
        todo,
        handleTodoChange,
        handleAddSubmit,
        todoList,
        addError,
        handleTodoDelete,
        handleTodoUpdate,
        completedList,
        incompleteList,
        handleClearClick
    }

    return (
        <TodoContext.Provider value={value}>
            {props.children}
        </TodoContext.Provider>
    )
}

export {TodoContext, TodoContextProvider}