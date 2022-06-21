import React, { Component } from 'react';
import { Title } from './styled/Title';

interface ClockState {
  count: number;
}

export class Clock extends Component<any, ClockState> {
  constructor(props: any) {
    super(props);

    this.state = { count: 1 };

    setInterval(() => {
      // this.state.count = this.state.count + 1;
      // this.setState({ count: this.state.count + 1});
    }, 1000);
  }

  render() {
    return <Title>{this.state.count} </Title>;
  }
}
