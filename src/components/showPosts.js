import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, upVotePostScore, downVotePostScore } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { friendlyTime } from '../utils/helpers';

class ShowPosts extends Component {

  componentWillMount() {
    const category = this.props.match ? this.props.match.params.category : 'none';
    this.props.fetchAllPosts(category);
  }

  shouldComponentUpdate(nextProps) {

    const currentCategory = this.props.match.params.category
    const nextCategory = nextProps.match.params.category

    if (currentCategory !== nextCategory) {
      const category = nextCategory !== undefined ? nextCategory.trim() : 'none';
      this.props.fetchAllPosts(category);
      return false
    }
    else {
      return true
    }
  }

  incrementScore = (postId) => {

    this.props.upVotePost(postId)
  }

  decrementScore = (postId) => {
    this.props.downVotePost(postId)
  }

  render() {

    const { posts } = this.props;


    return (
      <div className="container">
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={ post.id }>
              <div className="post-score">
                <div className="add-score" onClick={() => this.incrementScore(post.id)}>&#x25B2;</div>
                <div className="score-count">{ post.voteScore }</div>
                <div className="minus-score" onClick={() => this.decrementScore(post.id) }>&#x25BC;</div>
              </div>
              <div className="post-details">
                <Link to={`/${post.category}/${post.id}`}>
                  <h3 className="post-title">{ post.title }</h3>
                </Link>
                <h4 className="post-author">{ post.author }</h4>
                <Link to={`/${post.category}`}><h4 className="post-category">{ post.category }</h4></Link>
                <small className="post-date">{ friendlyTime(post.timestamp) }</small>
                <p className="post-body">{ post.body }</p>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div>
              <h4>No Posts for this category</h4>
            </div>
          )}
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
    fetchAllPosts: (data) => dispatch(fetchPosts(data)),
    upVotePost: (data) => dispatch(upVotePostScore(data)),
    downVotePost: (data) => dispatch(downVotePostScore(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts);
