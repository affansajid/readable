import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router-dom';

class ShowPost extends Component {

  componentWillMount() {
    let post_id = this.props.match.params.id;
    this.props.fetchPost(post_id);
  }

  render() {
    const { post } = this.props


    return (
      <div className="post-container">
        <div className="single-post">
          <div className="post">
            <div className="post-score">
              <div className="add-score">&#x25B2;</div>
              <div className="score-count">{ post.voteScore }</div>
              <div className="minus-score">&#x25BC;</div>
            </div>
            <div className="post-details">
              <h3 className="post-title">{ post.title }</h3>
              <h4 className="post-author">{ post.author }</h4>
              <Link to={`/category/${post.category}`}><h4 className="post-category">{ post.category }</h4></Link>
              <small className="post-date">{ post.timestamp }</small>
              <p className="post-body">{ post.body }</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: (data) => dispatch(fetchPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
