import {
  FETCH_POSTS,
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
      return [...state, ...action.posts]

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
      console.log(action.categories)
      return [...state, ...action.categories]

    default:
      return state;
  }
}

export default combineReducers({
	posts,
	comments,
  categories
})
