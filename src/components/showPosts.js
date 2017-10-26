import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, upVotePostScore } from '../actions';
import { Link } from 'react-router-dom';
import ShowCategories from './showCategories';
import _ from 'lodash';

class ShowPosts extends Component {

  componentWillMount() {
    let category = this.props.match ? this.props.match.params.category : 'none';
    this.props.fetchPosts(category);
  }

  incrementScore = (post) => {

    this.props.updatePostScore(post, "upVote")
  }

  decrementScore = (post) => {
    this.props.updatePostScore(post.id, "downVote")
  }

  render() {

    const { posts } = this.props;


    return (
      <div className="container">
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={ post.id }>
              <div className="post-score">
                <div className="add-score" onClick={this.incrementScore(post.id)}>&#x25B2;</div>
                <div className="score-count">{ post.voteScore }</div>
                <div className="minus-score" onClick={() => {this.decrementScore} }>&#x25BC;</div>
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
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const posts = _.filter(state.posts, post => !post.deleted);

  return {
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data)),
    updatePostScore: (data) => dispatch(upVotePostScore(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts);
