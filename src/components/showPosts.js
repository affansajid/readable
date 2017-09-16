import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class ShowPosts extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPost(post) {
    return (
      <div className="post">
        <div className="post-score">
          <div className="add-score">&#x25B2;</div>
          <div className="score-count">{ post.voteScore }</div>
          <div className="minus-score">&#x25BC;</div>
        </div>
        <div className="post-details">
          <h3 className="post-title">{ post.title }</h3>
          <h4 className="post-author">{ post.author }</h4>
          <h4 className="post-category">{ post.category }</h4>
          <small className="post-date">{ post.timestamp }</small>
          <p className="post-body">{ post.body }</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="posts">
        {this.props.posts.map(this.renderPost)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts);
