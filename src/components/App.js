/*
* @author: dzuncoi
* @date: April 1 2017
*/

import React, { PropTypes } from 'react'
import CategoryContainer from './CategoryContainer';
import TodoContainer from './TodoContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCategory: null
    }
    this.onSelectCategory = this.onSelectCategory.bind(this);
  }

  onSelectCategory(category) {
    this.setState({
      chosenCategory: category
    })
  }

  render () {
    return (
      <div className="row" style={{padding: '0 30px'}}>
        <h3>TODO APP</h3>
        <div className="col-md-4">
          <CategoryContainer
            onSelectCategory={this.onSelectCategory}/>
        </div>
        <div className="col-md-8">
          <TodoContainer
            category={this.state.chosenCategory}/>
        </div>
      </div>
    )
  }
}

export default App
