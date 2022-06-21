import React, { ChangeEvent, Component } from 'react';

import './App.css';

import StatePicker from './components/StatePicker';
import Summary from './components/Summary';
import Counter from './components/Counter';
import { ElectionState } from './election.model';

interface AppState {
  selectedState?: ElectionState;
  elections: ElectionState[];
  destroyed: boolean;
}

export default class App extends Component<any, AppState> {
  state: AppState = {
    selectedState: undefined,
    elections: [],
    destroyed: false,
  };

  charSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const stateId = Number(event.target.value);
    const selectedState = this.state.elections.find(item => item.id === stateId);
    this.setState({ selectedState: selectedState });
  };

  destructionHandler = () => {
    this.setState({ destroyed: true });
  };

  componentDidMount() {
    fetch('https://5e7db521fa19eb0016519ec1.mockapi.io/elections')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }

        return response.json();
      })
      .then((data) => {
        this.setState({
          elections: data,
        });
      });
  }

  render() {
    if (this.state.destroyed) {
      return <h1>Components destroyed</h1>;
    }

    return (
      <div>
        <Counter />
        <hr />

        <StatePicker
          options={this.state.elections}
          selectedId={this.state.selectedState?.id}
          onSelectState={this.charSelectHandler}
        />
        <hr />

        <Summary state={this.state.selectedState} />
        <hr />

        <button onClick={this.destructionHandler}>DESTROY!</button>
      </div>
    );
  }
}
