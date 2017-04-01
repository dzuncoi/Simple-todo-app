/*
* @author: dzuncoi
* @date: April 1 2017
*/

import React, { PropTypes } from 'react'
import CategoriesList from './CategoriesList';
import request from 'superagent';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.createCategory = this.createCategory.bind(this);
  }

  componentWillMount() {
    this.retrieveCategories();
  }

  retrieveCategories() {
    request.get('/categories')
    .then(res => {
      this.setState({
        categories: res.body
      })
    })
    .catch(err => console.log(err));
  }

  createCategory(e) {
    e.preventDefault();
    const title = this.refs.categoryInput.value;
    if (!title) return;
    request
    .post('/categories')
    .send({title: title})
    .set('Content-Type', 'application/json')
    .then(newCategory => {
      this.state.categories.unshift(newCategory.body);
      this.setState({
        categories: this.state.categories
      }, () => {
        this.refs.categoryInput.value = "";
      })
    })
    .catch(err => {
      this.refs.categoryInput.value = "";
    });
  }

  render () {
    return (
      <div>
        <div style={{marginBottom: 10}}>
          <CategoriesList
            {...this.state}
            onSelectCategory={this.props.onSelectCategory}/>
        </div>
        <form onSubmit={this.createCategory} className="form">
          <input className="form-control" type="text" ref="categoryInput" placeholder="Create new category"/>
        </form>
      </div>
    )
  }
}

export default CategoryContainer
