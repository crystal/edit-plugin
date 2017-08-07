import axios from 'axios';

function getPosts() {
  return (dispatch) => {
    dispatch({
      type: 'GET_POSTS_REQ'
    });
    axios.get('/?rest_route=/wp/v2/posts&per_page=5')
      .then((response) => {
        dispatch({
          type: 'GET_POSTS_RES',
          posts: response.data.map(post => ({
            title: post.title.rendered,
            content: post.content.rendered
          }))
        });
      })
      .catch((error) => {
        dispatch({
          type: 'GET_POSTS_ERR',
          error: error.message
        });
      });
  };
}

export default getPosts;
