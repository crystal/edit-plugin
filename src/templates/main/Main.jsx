import React from 'react';

import styles from './Main.sass';

class MainTemplate extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default MainTemplate;
