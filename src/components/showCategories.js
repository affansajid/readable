import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions';

class ShowCategories extends Component {

  componentWillMount() {
    this.props.fetchCategories();
  }

  renderCategory(category) {
    return (
      <div>{ category.name }</div>
    )
  }

  render() {
    return (
      <div className="container">
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
