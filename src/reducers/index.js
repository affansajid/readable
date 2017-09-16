import {
  FETCH_POSTS,
  FETCH_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  FETCH_CATEGORIES
 } from '../actions'

import { combineReducers } from 'redux';

function posts (state = [], action) {
	switch (action.type) {

    case FETCH_POSTS:
      return [...action.posts]

    case FETCH_POST:
      return [...state, ...action.post]


		default :
			return state
	}
}

function post (state = {}, action) {
	switch (action.type) {

    case FETCH_POST:
      return {...action.post}

		default :
			return state
	}
}

function comments (state = [], action) {
  switch (action.type) {

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
  post,
	comments,
  categories
})
