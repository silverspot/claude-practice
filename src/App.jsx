import { useEffect, useState } from 'react'
import TodoItem from './TodoItem.jsx'
import './App.css'

const STORAGE_KEY = 'todos'

const FILTERS = {
  all: () => true,
  active: (todo) => !todo.done,
  done: (todo) => todo.done,
}

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // Storage can be unavailable (e.g. private mode); the list still works in memory.
    }
  }, [todos])

  function addTodo(event) {
    event.preventDefault()
    const title = text.trim()
    if (!title) return
    setTodos([...todos, { id: crypto.randomUUID(), title, done: false }])
    setText('')
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  function clearDone() {
    setTodos(todos.filter((t) => !t.done))
  }

  const visible = todos.filter(FILTERS[filter])
  const remaining = todos.filter((t) => !t.done).length
  const doneCount = todos.length - remaining

  return (
    <main className="todo-app">
      <h1>To-do list</h1>

      <form className="add-form" onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New to-do"
          autoFocus
        />
        <button type="submit" disabled={!text.trim()}>
          Add
        </button>
      </form>

      {todos.length > 0 && (
        <div className="filters" role="group" aria-label="Filter to-dos">
          {Object.keys(FILTERS).map((name) => (
            <button
              key={name}
              type="button"
              className={filter === name ? 'active' : ''}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name[0].toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      )}

      <ul className="todo-list">
        {visible.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty">Nothing to do yet. Add your first task above.</p>
      )}
      {todos.length > 0 && visible.length === 0 && (
        <p className="empty">No {filter} tasks.</p>
      )}

      {todos.length > 0 && (
        <footer className="summary">
          <span>
            {remaining} {remaining === 1 ? 'task' : 'tasks'} left
          </span>
          {doneCount > 0 && (
            <button type="button" className="link" onClick={clearDone}>
              Clear completed ({doneCount})
            </button>
          )}
        </footer>
      )}
    </main>
  )
}

export default App
