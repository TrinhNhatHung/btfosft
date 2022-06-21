import React from 'react';

import './Counter.css';

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
      <div className="counter">
        <button className="button" onClick={this.decreaseCount}>−</button>
        <div className="span-wrapper">
          <span className="span">{this.state.count}</span>
        </div>
        <button className="button" onClick={this.increaseCount}>+</button>
      </div>
    );
  }
}

export default Counter;
