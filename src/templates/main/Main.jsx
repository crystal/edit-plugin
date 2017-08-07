import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import getPosts from '../../actions/getPosts';

import styles from './Main.sass';

class MainTemplate extends React.Component {
  componentWillMount() {
    this.props.getPosts();
  }
  render() {
    return (
      <div className={styles.main}>
        <h1>Hello World!</h1>
        <ul>
          {this.props.posts.map((post) => {
            return (
              <li>
                <h2>{post.title}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

MainTemplate.defaultProps = {
  getPosts: () => {},
  posts: []
};

MainTemplate.propTypes = {
  getPosts: PropTypes.func,
  posts: PropTypes.array
};

function mapStateToProps(state) {
  return {
    posts: state.posts.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => {
      dispatch(getPosts());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTemplate);
