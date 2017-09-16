const API_ID = "my_readable_api_id"

export function fetchPosts (category = 'none') {

  if (category !== 'none') {
    return fetch(
        `http://localhost:5001/${category}/posts`,
        { headers: { 'Authorization': API_ID }}
      )
      .then((res) => res.json())
  }
  else {
    return fetch(
        'http://localhost:5001/posts',
        { headers: { 'Authorization': API_ID }}
      )
      .then((res) => res.json())
  }
}

export function fetchPost (post_id) {
  let postID = post_id;
  
  return fetch(
      `http://localhost:5001/posts/${postID}`,
      { headers: { 'Authorization': API_ID }}
    )
    .then((res) => res.json())
}


export function fetchCategories () {

  return fetch(
      'http://localhost:5001/categories',
      { headers: { 'Authorization': API_ID }}
    )
    .then((res) => res.json())
}
