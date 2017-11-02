const API_ID = "my_readable_api_id"
const headers = { 'Authorization': API_ID, 'Accept': 'application/json', 'Content-Type': 'application/json' }

export function fetchPosts (category = 'none') {

  if (category !== 'none') {
    return fetch(
        `http://localhost:5001/${category}/posts`,
        { headers }
      )
      .then((res) => res.json())
  }
  else {
    return fetch(
        'http://localhost:5001/posts',
        { headers }
      )
      .then((res) => res.json())
  }
}

export function fetchPost (post_id) {
  let postID = post_id;

  return fetch(
      `http://localhost:5001/posts/${postID}`,
      { headers }
    )
    .then((res) => res.json())
}

export function updatePostScore (post_id, option) {
  let postID = post_id;
  return fetch(
      `http://localhost:5001/posts/${postID}`,
      { headers,
        method: 'POST',
        body: JSON.stringify({ option })
      }
    ).then((res) => res.json())
}


export function fetchCategories () {

  return fetch(
      'http://localhost:5001/categories',
      { headers }
    )
    .then((res) => res.json())
}
