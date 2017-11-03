import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchCategories, addPost } from '../actions';

class CreateEditPost extends Component {

  state = {
    author: '',
    body: '',
    title: '',
    category: ''
  }

  componentWillMount() {
    if (this.props.match.params.post_id !== undefined) {
      this.props.fetchPostData(this.props.match.params.post_id)
      .then((data) => this.setState({
        title: data.post.title,
        body: data.post.body
      }))
    }
    else {
      this.props.fetchCategories()
    }
  }

  addPost = () => {
    const { title, body, author, category } = this.state
    if (title !== '' && body !== '' && author !== '' && category !== '') {
      const post = {
        id: ('Post' + Date.now()),
        author,
        title,
        body,
        category,
        timestamp: Date.now()
      }
      this.props.addPostDispatcher(post)
      .then(this.setState({
        author: '',
        body: '',
        title: '',
        category: ''
      }))
    }
  }

  render() {
    const { title, author, body, category } = this.state

    if (this.props.match.params.post_id !== undefined) {
      return (
        <div className="create-edit-container">
          <h2>Editting Post</h2>
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            onChange={(event) => this.setState({title: event.target.value})}
            value={title}
            placeholder="Post Title" />
          <label>Body</label>
          <input
            className="form-control"
            type="text"
            onChange={(event) => this.setState({body: event.target.value})}
            value={body}
            placeholder="Post Body" /><br />
          <button className="button" onClick={() => this.updatePost()}>Update Post</button>
        </div>
      )
    }
    else {
      return (
        <div className="create-edit-container">
          <h2>Create A Post</h2>
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            onChange={(event) => this.setState({title: event.target.value})}
            value={title}
            placeholder="Post Title" />
          <label>Body</label>
          <input
            className="form-control"
            type="text"
            onChange={(event) => this.setState({body: event.target.value})}
            value={body}
            placeholder="Post Body" />
          <label>Author</label>
          <input
            className="form-control"
            type="text"
            onChange={(event) => this.setState({author: event.target.value})}
            value={author}
            placeholder="Post Author" />
          <label>Category</label>
          <select
            className="form-control"
            onChange={(event) => this.setState({
              category: event.target.value
            })}
            value={category}>
            {this.props.categories.map((category) => (
            <option value={category.name} key={category.name}>{category.name}</option>
            ))}
          </select><br />
          <button className="button" onClick={() => this.addPost()}>Update Post</button>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostData: (data) => dispatch(fetchPost(data)),
    fetchCategories: (data) => dispatch(fetchCategories(data)),
    addPostDispatcher: (data) => dispatch(addPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPost);
