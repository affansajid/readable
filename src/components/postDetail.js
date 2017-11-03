import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchPost,
    fetchComments,
    upVotePostScore,
    downVotePostScore,
    upVoteCommentScore,
    downVoteCommentScore,
    addComment
  } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { friendlyTime } from '../utils/helpers';

class ShowPost extends Component {

  state = {
    author: '',
    commentBody: ''
  }

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

  addComment = () => {
    const { author, commentBody } = this.state
    if (author !== '' && commentBody !== '') {
      const comment = {
        id: ('Comment' + Date.now()),
        author: author,
        body: commentBody,
        voteScore: 0,
        deleted: false,
        timestamp: Date.now(),
        parentId: this.props.match.params.post_id,
        parentDeleted: false
      }
      this.props.addCommentDispatcher(comment)
      .then(this.setState({
        author: '',
        commentBody: ''
      }))
    }

  }

  renderAddComment() {
    return (
      <div className="add-comment">
        <input
          type="text"
          name="author"
          onChange={(event) => this.setState({author: event.target.value})}
          value={this.state.author}
          placeholder="Your Name"
          required />
        <input
          type="text"
          name="commentBody"
          onChange={(event) => this.setState({commentBody: event.target.value})}
          value={this.state.commentBody}
          placeholder="Your comment"
          required />
        <button onClick={() => this.addComment()}>Add Comment</button>
      </div>
    )
  }

  render() {

    const { post, comments } = this.props
    if (post === Object.empty) {
      return (
        <div className="loading">Loading...</div>
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

          <div className="comments-container">
            <h3>Comments</h3>

            {comments.length === 0 && (
              <div className="no-comments">
                <p>This post has no comments. Add a comment below</p>
              </div>
            )}

            {comments.length > 0 && (
              comments.map((comment) => (
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
              ))
            )}

            {this.renderAddComment()}
          </div>
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
    comments: comments.sort((a, b) => {
      return b.voteScore - a.voteScore
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostData: (data) => dispatch(fetchPost(data)),
    fetchPostComments: (data) => dispatch(fetchComments(data)),
    upVotePost: (data) => dispatch(upVotePostScore(data)),
    downVotePost: (data) => dispatch(downVotePostScore(data)),
    upVoteComment: (data) => dispatch(upVoteCommentScore(data)),
    downVoteComment: (data) => dispatch(downVoteCommentScore(data)),
    addCommentDispatcher: (data) => dispatch(addComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
