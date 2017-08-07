const initialState = {
  error: '',
  isComplete: false,
  isLoading: false,
  posts: []
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE_POST_REQ': {
      return {
        ...state,
        error: '',
        isComplete: false,
        isLoading: true,
        posts: []
      };
    }
    case 'EDIT_POST_REQ': {
      return {
        ...state,
        error: '',
        isComplete: false,
        isLoading: true,
        posts: []
      };
    }
    case 'GET_POSTS_REQ': {
      return {
        ...state,
        error: '',
        isComplete: false,
        isLoading: true,
        posts: []
      };
    }
    case 'GET_POSTS_RES': {
      return {
        ...state,
        error: '',
        isComplete: true,
        isLoading: false,
        posts: action.posts
      };
    }
    case 'GET_POSTS_ERR': {
      return {
        ...state,
        error: action.error,
        isComplete: false,
        isLoading: false,
        posts: []
      };
    }
    default: {
      return state;
    }
  }
}

export default postsReducer;
