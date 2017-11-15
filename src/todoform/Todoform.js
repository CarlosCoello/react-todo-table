import React, { Component } from 'react';
import './Todoform.css';
import { DB_CONFIG } from '../config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import TodoItem from '../todoitem/Todoitem';
firebase.initializeApp(DB_CONFIG);

class TodoForm extends Component{

  constructor(props){
    super(props);
    this.db = firebase.database().ref().child('todos');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateChange = this.handleUpdateChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.state = {
      todos: [],
      newTodo: '',
      updateTodo: '',
      updateId: '',
      bool: false,
      add: 'Add Todo',
      edit: 'Edit Todo'
    }
  }

  componentWillMount(){
    const previousTodos = this.state.todos;

    // Get todos from firebase whenever a child is added
    this.db.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        todo: snap.val().todo
      })
      this.setState({
        todos: previousTodos
      })
    })

    // Splice removed child and set new state
    this.db.on('child_removed', snap => {
      for(var i = 0; i < previousTodos.length; i++){
        if( previousTodos[i].id === snap.key ){
          previousTodos.splice(i,1);
        }
      }
      this.setState({
        todos: previousTodos
      })
    })

    this.db.on('child_changed', snap => {
      for(var i = 0; i < previousTodos.length; i++){
        if( previousTodos[i].id === snap.key ){
          previousTodos[i].todo = snap.val().todo;
        }
      }
      this.setState({
        todos: previousTodos
      })
    })

  }

  // post a new todo to firebase database
  handleSubmit(e){
    e.preventDefault();
    this.db.push().set({ todo: this.state.newTodo });
    this.setState({
      newTodo: ''
    })
  }

  handleUpdateSubmit(e){
    e.preventDefault();
    if( this.state.bool === false ){
      return;
    } else {
      this.db.child(this.state.updateId).update({ todo: this.state.updateTodo });
      this.setState({
        updateTodo: '',
        updateId: '',
        bool: false
      })
    }
  }

  // get input value and set it on the state
  handleChange(e){
    this.setState({
      newTodo: e.target.value
    })
  }

  handleUpdateChange(e){
    this.setState({
      updateTodo: e.target.value
    })
  }

  // remove todo from database
  removeTodo(id){
    this.db.child(id).remove();
  }

  // edit Todo
  editTodo(obj){
    this.setState({
      updateTodo: obj.todo,
      updateId: obj.id,
      bool: true
    })
  }

  cancelUpdate(){
    this.setState({
      bool: false
    })
  }

  render(){
    const hideForm = {
      display: 'none'
    }

    const showForm = {
      display: 'block'
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} style={ this.state.bool === true ? hideForm : showForm }>
          <div className="form-group">
            <label>Add Todo</label>
            <input type="text" name="todo" className="form-control" placeholder="Type todo ..." onChange={this.handleChange} value={this.state.newTodo} />
          </div>
          <button type="submit" className="btn btn-primary mt-2">Add Todo</button>
        </form>
        <form onSubmit={this.handleUpdateSubmit} style={ this.state.bool === true ? showForm : hideForm }>
          <div className="form-group">
            <label>Update Todo</label>
            <input type="text" name="Update" className="form-control" placeholder="Update todo ..." onChange={this.handleUpdateChange} value={this.state.updateTodo} />
          </div>
          <button type="submit" className="btn btn-primary mt-2">Update Todo</button>
          &nbsp;
          <button onClick={this.cancelUpdate} className="btn btn-danger mt-2">Cancel Update</button>
        </form>
        <br />
        <div className="todoItemWrapper">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>todo</th>  
                <th>edit</th>  
                <th>delete</th>
              </tr>  
            </thead>
            <tbody>
            {
              this.state.todos.map( (todo) => {
              return (
                    <TodoItem todo={todo.todo} todoId={todo.id} key={todo.id}
                    removeTodo={this.removeTodo} editTodo={this.editTodo} />
                  )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TodoForm;
