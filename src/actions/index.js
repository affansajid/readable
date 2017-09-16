export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_POST = "DELETE_POST";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_POSTS = "FETCH_POSTS";



export function fetchPosts (category) {
	return {
		type: FETCH_POSTS,  
		payload: {
      category: category,
      posts: [
        {
          title: "Hello World!",
          body: "This is a hello world post.",
          author: "Affan"
        }
      ]
    }
	}
}
