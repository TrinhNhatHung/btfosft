import React from 'react';

import styles from './Counter.module.css';

class Counter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { count: 1 };
  }

  decreaseCount = () => {
    this.setState((prevState: any) => ({ count: prevState.count - 1 }));
  }

  increaseCount = () => {
    this.setState((prevState: any) => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div className={styles.counter}>
        <button className={styles.button} onClick={this.decreaseCount}>−</button>
        <div className={styles.spanWrapper}>
          <span className={styles.span}>{this.state.count}</span>
        </div>
        <button className={styles.button} onClick={this.increaseCount}>+</button>
      </div>
    );
  }
}

export default Counter;
