import React, { ChangeEvent, useEffect, useState } from 'react';

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

const App = () => {
  const [selectedState, setSelectedState] = useState({} as ElectionState);
  const [elections, setElections] = useState([] as ElectionState[]);
  const [destroyed, setDestroyed] = useState(false);

  const charSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const stateId = Number(event.target.value);
    const selectedState = elections.find((item) => item.id === stateId);

    setSelectedState(selectedState as ElectionState);
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };

  const reRenderHandler = () => {
    setSelectedState({ ...selectedState });
  };

  useEffect(() => {
    fetch('https://5e7db521fa19eb0016519ec1.mockapi.io/elections')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }

        return response.json();
      })
      .then((data) => {
        setElections(data);
      });
  }, []);

  if (destroyed) {
    return <h1>Components destroyed</h1>;
  }

  return (
    <div>
      <Counter />
      <hr />

      <StatePicker
        options={elections}
        selectedId={selectedState?.id}
        onSelectState={charSelectHandler}
      />
      <hr />

      <Summary state={selectedState} />
      <hr />

      {selectedState.candidates && <button onClick={reRenderHandler}>Re Select</button>}
      <button onClick={destructionHandler}>DESTROY!</button>
    </div>
  );
};

export default App;
