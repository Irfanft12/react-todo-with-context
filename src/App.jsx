import AddTodo from './components/AddTodo'
import TodoCount from './components/TodoCount'
import TodoList from './components/TodoList'
import logo from "/logo.svg"

function App() {

  return (
    <>
      <header>
        <img src={logo} alt="" />
        <h1 className="logo-text">Todo List</h1>
      </header>
      <main>
        <AddTodo />
        <TodoList />        
      </main>
      <TodoCount />
    </>
    
  )
}

export default App
