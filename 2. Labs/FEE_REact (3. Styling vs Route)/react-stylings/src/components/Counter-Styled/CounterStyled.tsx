import React from 'react';

import styled, { keyframes } from 'styled-components';

const CounterDiv = styled.div`
  display: flex;
  align-items: center;
`;

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  font-size: 1em;
  border-radius: 5px;
  border: 2px solid black;
  width: 40px;
  height: 40px;
  background: ${props => props.primary ? "dodgerblue" : "white"};
  color: ${props => props.primary ? "white" : "dodgerblue"};
  outline: none;
  &:active {
    opacity: 0.4;
    transform: scale(0.9);
  }
`;

const RoundedButton = styled(Button)`
  border-radius: 50%;
  transform: rotate(45deg);
`;

const SpanWrapper = styled.span`
  overflow: hidden;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Span = styled.span`
  font-size: 2rem;
  width: 40px;
  display: inline-block;
  text-align: center;
  animation: ${rotate} 1s linear infinite;
`;

class Counter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { count: 1 };
  }

  decreaseCount = () => {
    this.setState((prevState: any) => ({ count: prevState.count - 1 }));
  };

  increaseCount = () => {
    this.setState((prevState: any) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <CounterDiv>
        <Button primary onClick={this.decreaseCount} title="Decrease">−</Button>
        <SpanWrapper>
          <Span>{this.state.count}</Span>
        </SpanWrapper>
        <Button onClick={this.increaseCount} title="Increase">+</Button>
        <RoundedButton>+</RoundedButton>
        <StyledLink></StyledLink>
      </CounterDiv>
    );
  }
}

export default Counter;


// 3-rd party Component
const Link = ({ className, children }: any) => (
  <a className={className}>
    {children}
  </a>
);

// define styles
const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

