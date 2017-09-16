import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';
import { Link } from 'react-router-dom';

class ShowCategories extends Component {

  componentWillMount() {
    this.props.fetchCategories();
  }

  renderCategory(category) {
    return (
      <div className="category" key={ category.name }>
        <Link to={`/category/${category.path} `}>{ category.name }</Link>
      </div>
    )
  }

  render() {
    return (
      <div className="category-container">
        {this.props.categories.map(this.renderCategory)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: (data) => dispatch(fetchCategories(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCategories);
