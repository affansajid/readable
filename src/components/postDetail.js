import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router-dom';

class ShowPost extends Component {

  componentWillMount() {
    let post_id = this.props.match.params.post_id;
    this.props.fetchPostData(post_id);
  }

  friendlyTime = (date) => {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var postDate = new Date(date)

    return (
      monthNames[postDate.getMonth()] + ' ' + postDate.getDate() + ', ' + postDate.getFullYear()
    )
  }

  render() {

    const { post } = this.props
    if (post === Object.empty) {
      return (
        <div>Loading...</div>
      )
    }
    else {
      return (
        <div className="post-container">
          <div className="single-post">
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
                <small className="post-date">{ this.friendlyTime(post.timestamp) }</small>
                <p className="post-body">{ post.body }</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.post_id

  return {
    post: state.posts[id]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostData: (data) => dispatch(fetchPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
