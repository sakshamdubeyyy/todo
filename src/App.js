import { useReducer, useState } from 'react';
import './App.css';
import Todo from './Todo';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

const reducer = (todos, action) => {
  switch (action.type){
    case ACTIONS.ADD_TODO:
      return [ ...todos, newTodo(action.payload.task)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if(todo.id === action.payload.id){
          return {...todo, complete: !todo.complete}
        }
        return todo;
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);
    default:
      return todos
  }
}

const newTodo = (task) => {
  return { id: Date.now(), task: task, complete: false }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: ACTIONS.ADD_TODO, payload: {task: task}});
    setTask('');
  } 

  console.log(todos);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={task} onChange={e => setTask(e.target.value)}/> 
      </form>
      {todos.map(todo => (
        <Todo key= {todo.id} todo= {todo} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default App;
