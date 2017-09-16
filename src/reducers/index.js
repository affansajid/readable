import {
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
 } from '../actions'

import { combineReducers } from 'redux';

function posts (state = [], action) {
	switch (action.type) {

    case FETCH_POSTS:
      return [...state, ...action.payload.posts]

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

export default combineReducers({
	posts,
	comments
})
