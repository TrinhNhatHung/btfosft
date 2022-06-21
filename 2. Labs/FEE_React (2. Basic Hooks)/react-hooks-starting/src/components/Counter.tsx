import React, { Component } from 'react';

interface CounterState {
  count: number;
}

export default class Counter extends Component<any, CounterState> {
  state = { count: 0 };

  onClick = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  render() {
    return (<div>
      <h1>Count: { this.state.count }</h1>
      <button onClick={this.onClick}>Click</button>
    </div>)
  }
}

