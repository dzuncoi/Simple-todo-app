/*
* @author: dzuncoi
* @date: April 1 2017
*/

import React, { PropTypes } from 'react'
import moment from 'moment'

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { categories } = this.props;
    return (
      <div>
        <h3>CATEGORY LIST</h3>
        {
          categories.map(category => {
            return (
              <div key={category._id} style={{borderBottom: '1px solid #ccc', padding: '10px 0', marginBototm: 10, cursor: 'pointer'}} onClick={() => this.props.onSelectCategory(category)}>
                <div>{category.title}</div>
                <small>{moment(category.created_at).format('YYYY-MM-DD hh:mm')}</small>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default CategoriesList
