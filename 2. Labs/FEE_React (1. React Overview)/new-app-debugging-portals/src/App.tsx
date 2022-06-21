import React, { Component } from 'react';
import styled from 'styled-components';

import { Title } from './styled/Title';
import { Hello } from './components/Hello';

import { ErrorBoundary } from './components/ErrorBoundary';
import { Modal } from './components/Modal';

import { Dropdown } from './components/Dropdown';

const Limit = styled.div`
  height: 100px;
  overflow: hidden;
  position: relative;
`;

const TitleBlue = styled(Title)<any>`
  color: ${(props) => props.color};
`;

const HelloStyled = styled(Hello)`
  font-size: 20px;
  margin-top: 200px;
  color: purple;
  font-weight: 400px;

  &:hover {
    color: black;
  }

  & .text {
    color: red;
  }

  @media (min-width: 576px) {
    font-size: 32px;
  }

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { color: 'blue', open: false };
  }

  handleClick = () => {
    const colors = ['red', 'blue', 'black', 'yellow'];

    this.setState({ color: colors[Math.floor(Math.random() * 4)] });
  };

  render() {
    return (
      <ErrorBoundary>
        <Limit onClick={console.log}>
          <Modal open={this.state.open}>
            <h1>Dialog</h1>
            <p>Lorem ipsum ...</p>
            <p>Duis autem ...</p>
            <div style={{ flex: 1 }} />
            <button
              className="button"
              onClick={() => this.setState({ open: false })}
            >
              OK
            </button>
          </Modal>
          <button onClick={() => this.setState({ open: true })}>
            Open dialog
          </button>
          <Dropdown lists={['a', 'b', 'c']}>Choose your name</Dropdown>
          <Dropdown lists={['a', 'b', 'c']}>Choose your firstname</Dropdown>
        </Limit>
      </ErrorBoundary>
    );
  }
}

export default App;
