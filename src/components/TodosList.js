import React, { PropTypes } from 'react'
import moment from 'moment'

class TodosList extends React.Component {
  render () {
    const { todos } = this.props;
    return (
      <div>
        {
          todos.map(todo => {
            return (
              <div key={todo._id}>
                <p>
                  <b>{todo.title}</b>
                  <small style={{fontSize: 'smaller', color: '#999'}}>- {moment(todo.created_at).format('YYYY-MM-DD hh:mm')}</small>
                </p>
                <p>{todo.description}</p>
                <hr/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default TodosList
