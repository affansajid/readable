import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import ShowCategories from './showCategories';

class ShowPosts extends Component {

  componentWillMount() {
    let category = this.props.match ? this.props.match.params.category : 'none';
    this.props.fetchPosts(category);
  }

  renderPost(post) {
    return (
      <div className="post" key={ post.id }>
        <div className="post-score">
          <div className="add-score">&#x25B2;</div>
          <div className="score-count">{ post.voteScore }</div>
          <div className="minus-score">&#x25BC;</div>
        </div>
        <div className="post-details">
          <Link to={`/posts/${post.id}`}>
            <h3 className="post-title">{ post.title }</h3>
          </Link>
          <h4 className="post-author">{ post.author }</h4>
          <Link to={`/category/${post.category}`}><h4 className="post-category">{ post.category }</h4></Link>
          <small className="post-date">{ post.timestamp }</small>
          <p className="post-body">{ post.body }</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="posts">
          {this.props.posts.map(this.renderPost)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts);
