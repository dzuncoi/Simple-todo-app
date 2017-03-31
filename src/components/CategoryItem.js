/*
* @author: dzuncoi
* @date: April 1 2017
*/

import React, { PropTypes } from 'react'

class CategoryItem extends React.Component {
  render () {
    return (
      <div>
        <p>Category title</p>
        <small>Created at: {Date.now()}</small>
      </div>
    )
  }
}

export default CategoryItem
