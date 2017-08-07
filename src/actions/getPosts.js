function getPosts() {
  return (dispatch) => {
    dispatch({
      type: 'GET_POSTS_REQ'
    });
    const posts = new wp.api.collections.Posts({ // eslint-disable-line no-undef
      per_page: 5,
      order: 'DESC',
      orderby: 'date'
    });
    posts.fetch({
      success: (model, response) => {
        dispatch({
          type: 'GET_POSTS_RES',
          posts: response.map(post => ({
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered
          }))
        });
      },
      error: (model, response) => {
        dispatch({
          type: 'GET_POSTS_ERR',
          error: response.message
        });
      }
    });
  };
}

export default getPosts;
