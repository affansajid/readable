import {
  FETCH_POSTS,
  FETCH_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  GET_COMMENTS,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  FETCH_CATEGORIES
 } from '../actions'

import _ from 'lodash'

import { combineReducers } from 'redux';

function posts (state = {}, action) {

  const { posts, post } = action;

	switch (action.type) {

    case FETCH_POSTS:
      const postsObj = _.mapKeys(posts, 'id')
      return postsObj

    case FETCH_POST:
      return {
        ...state,
        [post.id]: post
      }

    case ADD_POST:
      return {
        ...state,
        [post.id]: post
      }

    case EDIT_POST:
      return {
        ...state,
        [post.id]: post
      }

    case DELETE_POST:
      return {
        ...state,
        [post.id]: post
      }

    case UPVOTE_POST:
      return {
        ...state,
        [post.id]: post
      }

    case DOWNVOTE_POST:
      return {
        ...state,
        [post.id]: post
      }

		default :
			return state
	}
}

function comments (state = {}, action) {

  const { comments, comment } = action;

  switch (action.type) {
    case GET_COMMENTS:
      const commentsObj = _.mapKeys(comments, 'id')
      return commentsObj

    case UPVOTE_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }

    case DOWNVOTE_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }

    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }

    case DELETE_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }

    case EDIT_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }

    default:
      return state;
  }
}

function categories (state = [], action) {
  switch (action.type) {

    case FETCH_CATEGORIES:
      return [...action.categories]

    default:
      return state;
  }
}

export default combineReducers({
	posts,
	comments,
  categories
})
