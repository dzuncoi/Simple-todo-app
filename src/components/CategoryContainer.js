import React, { PropTypes } from 'react'
import CategoriesList from './CategoriesList';

class CategoryContainer extends React.Component {
  render () {
    return (
      <div>
        <CategoriesList/>
        <input type="text" ref="categoryInput"/>
      </div>
    )
  }
}

export default CategoryContainer
