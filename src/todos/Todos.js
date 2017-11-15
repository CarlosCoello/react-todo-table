import React, { Component } from 'react';
import './Todos.css';
import TodoForm from '../todoform/Todoform';

class Todos extends Component{

  render(){
    return (
      <div className="todosWrapper">
        <header className="page-header">
          <h2>Add OR Edit TODOS from your list</h2>
        </header>
        <TodoForm  />
      </div>
    )
  }
}

export default Todos;
