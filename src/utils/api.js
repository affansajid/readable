const API_ID = "my_readable_api_id"

export function fetchPosts (category = 'none') {

  if (category != 'none') {
    return fetch(
        `http://localhost:5001/${category}/posts`,
        { headers: { 'Authorization': API_ID }}
      )
      .then((res) => res.json())
      // .then(({ hits }) => hits.map(({ posts }) => posts))
  }
  else {
    return fetch(
        'http://localhost:5001/posts',
        { headers: { 'Authorization': API_ID }}
      )
      .then((res) => res.json())
      // .then(({ hits }) => hits.map(({ posts }) => posts))
  }
}

export function fetchCategories () {

  return fetch(
      'http://localhost:5001/categories',
      { headers: { 'Authorization': API_ID }}
    )
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ categories }) => categories))
}
