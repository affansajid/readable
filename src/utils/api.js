const API_ID = "my_readable_api_id"
const headers = { 'Authorization': API_ID, 'Accept': 'application/json', 'Content-Type': 'application/json' }
const SERVER_URL = 'http://localhost:5001'

// POSTS


// Fetching Posts
export function fetchPosts (category = 'none') {

  if (category !== 'none') {
    return fetch(
        `${SERVER_URL}/${category}/posts`,
        { headers }
      )
      .then((res) => res.json())
  }
  else {
    return fetch(
        `${SERVER_URL}/posts`,
        { headers }
      )
      .then((res) => res.json())
  }
}

// Fetch Post
export function fetchPost (post_id) {
  let postId = post_id;

  return fetch(
      `${SERVER_URL}/posts/${postId}`,
      { headers }
    )
    .then((res) => res.json())
}

// Add Post
export function addPost (post) {
  return fetch(
      `${SERVER_URL}/posts/`,
      { headers,
        method: 'POST',
        body: JSON.stringify(post)
      }
    )
    .then((res) => res.json())
}

// Edit Post
export function editPost (post) {
  let postId = post.id;
  return fetch(
      `${SERVER_URL}/posts/${postId}`,
      { headers,
        method: 'PUT',
        body: JSON.stringify(post)
      }
    )
    .then((res) => res.json())
}

// Delete Post
export function deletePost (postId) {
  let id = postId.toString()
  return fetch(
      `${SERVER_URL}/posts/${id}`,
      { headers,
        method: 'DELETE'
      }
    ).then((res) => res.json())
}

// Update Post Score
export function updatePostScore (post_id, option) {
  let postId = post_id;
  return fetch(
      `${SERVER_URL}/posts/${postId}`,
      { headers,
        method: 'POST',
        body: JSON.stringify({ option })
      }
    ).then((res) => res.json())
}

// COMMENTS

// Fetch Comments
export function fetchComments (post_id) {
  let postId = post_id;

  return fetch(
      `${SERVER_URL}/posts/${postId}/comments`,
      { headers }
    ).then((res) => res.json())
}

// Update Comment Score
export function updateCommentScore (comment_id, option) {
  let commentId = comment_id;
  return fetch(
      `${SERVER_URL}/comments/${commentId}`,
      { headers,
        method: 'POST',
        body: JSON.stringify({ option })
      }
    ).then((res) => res.json())
}

// Add Comment

export function addComment (comment) {
  return fetch(
      `${SERVER_URL}/comments`,
      { headers,
        method: 'POST',
        body: JSON.stringify(comment)
      }
    ).then((res) => res.json())
}

// Delete Comment

export function deleteComment (commentId) {
  return fetch(
      `${SERVER_URL}/comments/${commentId}`,
      { headers,
        method: 'DELETE'
      }
    ).then((res) => res.json())
}

// Edit Comment

export function editComment (comment) {
  let commentId = comment.id

  return fetch(
      `${SERVER_URL}/comments/${commentId}`,
      { headers,
        method: 'PUT',
        body: JSON.stringify(comment)
      }
    ).then((res) => res.json())
}

// CATEGORIES

export function fetchCategories () {

  return fetch(
      `${SERVER_URL}/categories`,
      { headers }
    )
    .then((res) => res.json())
}
