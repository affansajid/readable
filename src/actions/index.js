import * as ReadableAPI from '../utils/api';

export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_POST = "DELETE_POST";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST = "FETCH_POST";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";



// export function fetchPosts (category) {
// 	return {
// 		type: FETCH_POSTS,
// 		payload: {
//       category: category,
//       posts: [
//         {
//           title: "Hello World!",
//           id: 12432423,
//           body: "This is a hello world post.",
//           author: "Affan",
//           timestamp: "Fri, Sept 15, 2017",
//           voteScore: 30,
//           deleted: false,
//           category: "Tech"
//         }
//       ]
//     }
// 	}
// }

// Fetching Posts

export const receivePosts = posts => ({
  type: FETCH_POSTS,
  posts
});

export const fetchPosts = (data) => dispatch => (
  ReadableAPI
      .fetchPosts(data)
      .then(posts => dispatch(receivePosts(posts)))
);

// Fetching a post

export const receivePost = post => ({
  type: FETCH_POST,
  post
});


export const fetchPost = (data) => dispatch => (
  ReadableAPI
      .fetchPost(data)
      .then(post => dispatch(receivePost(post)))
);

// Fetching categories

export const receiveCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories: categories['categories']
});

export const fetchCategories = () => dispatch => (
  ReadableAPI
      .fetchCategories()
      .then(categories => dispatch(receiveCategories(categories)))
);
