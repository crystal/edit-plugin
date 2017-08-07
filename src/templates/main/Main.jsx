import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import deletePost from '../../actions/deletePost';
import editPost from '../../actions/editPost';
import getPosts from '../../actions/getPosts';

import styles from './Main.sass';

class MainTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPostId: 0,
      currentPostTitle: ''
    };
  }
  componentWillMount() {
    this.props.getPosts();
  }
  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handlePost(id) {
    this.setState({
      currentPostId: id,
      currentPostTitle: this.props.posts.find(post => post.id === id).title
    });
  }
  handlePostHide() {
    this.setState({
      currentPostId: 0,
      currentPostTitle: ''
    });
  }
  handlePostSubmit(event) {
    event.preventDefault();
    this.props.editPost({
      id: this.state.currentPostId,
      title: this.state.currentPostTitle
    });
    this.handlePostHide();
  }
  render() {
    if (this.props.isLoading) {
      return (
        <h1 className={styles.loading}>
          Loading...
        </h1>
      );
    }
    return (
      <div className={styles.main}>
        <h1>Edit Plugin</h1>
        <ul>
          {this.props.posts.map((post) => {
            return (
              <li key={post.id}>
                {this.state.currentPostId === post.id ? (
                  <form onSubmit={event => this.handlePostSubmit(event)}>
                    <input
                      autoFocus
                      name="currentPostTitle"
                      onChange={event => this.handleInput(event)}
                      type="text"
                      value={this.state.currentPostTitle}
                    />
                    <button onClick={() => this.handlePostHide()} type="button">Cancel</button>
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <h2>{post.title}</h2>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                  }}
                />
                <button onClick={() => this.handlePost(post.id)}>edit post title</button>
                <button onClick={() => this.props.deletePost(post.id)}>delete post</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

MainTemplate.defaultProps = {
  deletePost: () => {},
  editPost: () => {},
  getPosts: () => {},
  isLoading: false,
  posts: []
};

MainTemplate.propTypes = {
  deletePost: PropTypes.func,
  editPost: PropTypes.func,
  getPosts: PropTypes.func,
  isLoading: PropTypes.bool,
  posts: PropTypes.array
};

function mapStateToProps(state) {
  return {
    isLoading: state.posts.isLoading,
    posts: state.posts.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (id) => {
      dispatch(deletePost(id));
    },
    editPost: (id) => {
      dispatch(editPost(id));
    },
    getPosts: () => {
      dispatch(getPosts());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTemplate);
