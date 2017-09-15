import {
  ADD_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  EDIT_POST,
  DELETE_POST,
  DELETE_COMMENT
 } from '../actions'


function posts (state = [], action) {
	switch (action.type) {
		case ADD_POST :

			return {
				...state
			}
		default :
			return state
	}
}

export default posts;
