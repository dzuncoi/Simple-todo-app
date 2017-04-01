/*
* @author: dzuncoi
* @date: April 1 2017
*/

import React, { PropTypes } from 'react'
import request from 'superagent'
import TodosList from './TodosList'

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.listenDescriptionInput = this.listenDescriptionInput.bind(this);
  }

  componentWillMount() {
    if (this.props.category)
      this.retrieveTodos(this.props.category)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category)
      this.retrieveTodos(nextProps.category)
  }

  retrieveTodos(category) {
    this.setState({
      todos: []
    }, () => {
      request
      .get('/todos')
      .query({
        conditions: JSON.stringify({
          category: category._id
        })
      })
      .then(todosResponse => {
        let { todos } = this.state;
        todos = todos.concat(todosResponse.body);
        this.setState({
          todos
        }, () => {
          this.listenDescriptionInput();
        });
      })
    })
  }

  listenDescriptionInput() {
    $('#descriptionInput').keypress(e => {
      if(e.which == 13){
        e.preventDefault();
        this.createTodo(e);
      }
    })
  }

  createTodo(e) {
    e.preventDefault();
    const title = this.refs.todoTitle.value;
    const description = this.refs.todoDescription.value;
    if (!title || !description) return;
    request
    .post('/todos')
    .send({
      title: title,
      description: description,
      category: this.props.category._id
    })
    .set('Content-Type', 'application/json')
    .then(newTodo => {
      this.state.todos.unshift(newTodo.body);
      this.setState({
        todos: this.state.todos
      }, () => {
        this.refs.todoTitle.value = "";
        this.refs.todoDescription.value = "";
      })
    })
  }

  componentDidMount() {

  }

  render () {
    const { category } = this.props;
    return (
      <div>
        <h3>TODOS LIST</h3>
        {
          !category &&
          <p>Please choose one category</p>
        }
        {
          category && (
            <div>
              <p>Category: {category.title}</p>
              <TodosList
                todos={this.state.todos}/>
              <form className="form" onSubmit={this.createTodo}>
                <label>Create new todo item</label>
                <input className="form-control" style={{marginBottom: 10}} type="text" ref="todoTitle" placeholder="Title"/>
                <textarea id="descriptionInput" className="form-control" cols="5" type="text" ref="todoDescription" placeholder="Description. Press Enter to submit"></textarea>
              </form>
            </div>
          )
        }
      </div>
    )
  }
}

export default TodoContainer
