import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchPost,
    fetchComments,
    upVotePostScore,
    downVotePostScore,
    upVoteCommentScore,
    downVoteCommentScore
  } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { friendlyTime } from '../utils/helpers';

class ShowPost extends Component {

  componentWillMount() {
    let postId = this.props.match.params.post_id;
    this.props.fetchPostData(postId)
    .then(this.props.fetchPostComments(postId))

  }

  // Post & Comment Actions

  incrementScore = (postId) => {
    this.props.upVotePost(postId)
  }
  decrementScore = (postId) => {
    this.props.downVotePost(postId)
  }
  incrementCommentScore = (commentId) => {
    this.props.upVoteComment(commentId)
  }
  decrementCommentScore = (commentId) => {
    this.props.downVoteComment(commentId)
  }

  render() {

    const { post, comments } = this.props
    if (post === Object.empty) {
      return (
        <div>Loading...</div>
      )
    }
    else {
      return (
        <div className="post-wrapper">
          <div className="post-container">
            <div className="single-post">
              <div className="post" key={ post.id }>
                <div className="post-score">
                  <div className="add-score" onClick={() => this.incrementScore(post.id)}>&#x25B2;</div>
                  <div className="score-count">{ post.voteScore }</div>
                  <div className="minus-score" onClick={() => this.decrementScore(post.id)}>&#x25BC;</div>
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
            </div>
          </div>
          {comments.length > 0 && (
            <div className="comments-container">
              <h3>Comments</h3>
              {comments.map((comment) => (
                <div className="single-post" key={ comment.id }>
                  <div className="post">
                    <div className="post-score">
                      <div className="add-score" onClick={() => this.incrementCommentScore(comment.id)}>&#x25B2;</div>
                      <div className="score-count">{ comment.voteScore }</div>
                      <div className="minus-score" onClick={() => this.decrementCommentScore(comment.id) }>&#x25BC;</div>
                    </div>
                    <div className="post-details">
                      <h4 className="post-author">{ comment.author }</h4>
                      <small className="post-date">{ friendlyTime(comment.timestamp) }</small>
                      <p className="post-body">{ comment.body }</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.post_id
  const comments = _.filter(state.comments, comment => !comment.deleted);

  return {
    post: state.posts[id],
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostData: (data) => dispatch(fetchPost(data)),
    fetchPostComments: (data) => dispatch(fetchComments(data)),
    upVotePost: (data) => dispatch(upVotePostScore(data)),
    downVotePost: (data) => dispatch(downVotePostScore(data)),    
    upVoteComment: (data) => dispatch(upVoteCommentScore(data)),
    downVoteComment: (data) => dispatch(downVoteCommentScore(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
