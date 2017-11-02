const API_ID = "my_readable_api_id"
const headers = { 'Authorization': API_ID, 'Accept': 'application/json', 'Content-Type': 'application/json' }
const SERVER_URL = 'http://localhost:5001'

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

export function fetchPost (post_id) {
  let postId = post_id;

  return fetch(
      `${SERVER_URL}/posts/${postId}`,
      { headers }
    )
    .then((res) => res.json())
}

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

export function fetchComments (post_id) {
  let postId = post_id;

  return fetch(
      `${SERVER_URL}/posts/${postId}/comments`,
      { headers }
    ).then((res) => res.json())
}

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

export function fetchCategories () {

  return fetch(
      `${SERVER_URL}/categories`,
      { headers }
    )
    .then((res) => res.json())
}
