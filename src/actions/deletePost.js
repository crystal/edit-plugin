import getPosts from './getPosts';

function deletePost(id) {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_POST_REQ'
    });
    const post = new wp.api.models.Post({ id }); // eslint-disable-line no-undef
    post.destroy({
      success: () => {
        dispatch({
          type: 'DELETE_POST_RES'
        });
        dispatch(getPosts());
      },
      error: (model, response) => {
        dispatch({
          type: 'DELETE_POSTS_ERR',
          error: response.message
        });
      }
    });
  };
}

export default deletePost;
