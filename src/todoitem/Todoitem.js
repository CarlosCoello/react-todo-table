import React, { Component } from 'react';
import './Todoitem.css';

class TodoItem extends Component{

  constructor(props){
    super(props);
    this.getId = this.getId.bind(this);
    this.editId = this.editId.bind(this);
  }

  getId(){
    this.props.removeTodo(this.props.todoId);
  }

  editId(){
    this.props.editTodo({ id: this.props.todoId, todo: this.props.todo});
  }

  render(){
    return (
        <tr>
          <td>{this.props.todo}</td>
          <td><span className="fa fa-pencil" onClick={this.editId}></span></td>
          <td><span className="fa fa-times" onClick={this.getId}></span></td>
        </tr>
    )
  }

}

export default TodoItem;
