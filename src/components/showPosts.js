import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts,
  upVotePostScore,
  downVotePostScore,
  fetchComments,
  deletePost } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { friendlyTime } from '../utils/helpers';

class ShowPosts extends Component {

  state = {
    sortBy: 'voteScore'
  }

  componentWillMount() {
    const category = this.props.match.params.category ? this.props.match.params.category : 'none';
    this.props.fetchAllPosts(category.trim());
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

  deletePost = (postId) => {
    this.props.deletePostDispatcher(postId)
    this.props.history.push('/')
  }

  sortPosts = (sortKey) => {
    this.setState({
      sortBy: sortKey
    })
  }

  render() {

    const { posts } = this.props;


    return (
      <div className="container">

        <div className="sort-selector">

          <Link
            to={'/create'}
            className="add-post">
            Add Post
          </Link>

          <span className="sort-title">Sort Posts By:</span>
          <select
            onChange={(event) => this.sortPosts(event.target.value)}
            value={this.state.sortBy}
            className="sort-control">
            <option value="" disabled>Sort By...</option>
            <option value="voteScore">Vote Score</option>
            <option value="Date">Date</option>
          </select>
        </div>

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
                  <h2 className="post-title">{ post.title }</h2>
                </Link>
                <p className="post-body">{ post.body }</p>
                <p className="post-author">By: { post.author }</p>
                <Link to={`/${post.category}`}><h4 className="post-category">#{ post.category }</h4></Link>
                <small className="post-date">Posted: { friendlyTime(post.timestamp) }</small><br />
                <small className="post-comment-count">Comments: { post.commentCount }</small>

              </div>
              <div className="post-actions">
                <Link className="edit-btn" to={`/edit/${post.id}`}>Edit</Link>
                <button className="delete-btn" onClick={() => this.deletePost(post.id)}>Delete</button>
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
    posts,
    comments: state.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAllPosts: (data) => dispatch(fetchPosts(data)),
    fetchAllComments: (data) => dispatch(fetchComments(data)),
    upVotePost: (data) => dispatch(upVotePostScore(data)),
    downVotePost: (data) => dispatch(downVotePostScore(data)),
    deletePostDispatcher: (data) => dispatch(deletePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts);
