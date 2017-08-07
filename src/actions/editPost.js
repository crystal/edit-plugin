import getPosts from './getPosts';

function editPost(opts) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_POST_REQ'
    });
    const post = new wp.api.models.Post({ id: opts.id }); // eslint-disable-line no-undef
    post.set('title', opts.title);
    post.save(null, {
      success: () => {
        dispatch({
          type: 'EDIT_POST_RES'
        });
        dispatch(getPosts());
      },
      error: (model, response) => {
        dispatch({
          type: 'EDIT_POSTS_ERR',
          error: response.message
        });
      }
    });
  };
}

export default editPost;
