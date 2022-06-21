import React, { Component } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  lists: string[];
}

interface DropdownState {
  isShow: boolean;
}

const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;

  &.show {
    display: block;
  }
`;

const DropdownButton = styled.button`
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
`;

const DropdownStyled = styled.div`
  position: relative;
`;

export class Dropdown extends Component<DropdownProps, DropdownState> {
  constructor(props: any) {
    super(props);

    this.state = { isShow: false };
  }

  handleClick = () => {
    this.setState((prevState) => ({ isShow: !prevState.isShow }));
  };

  render() {
    const { lists } = this.props;
    const { isShow } = this.state;

    return (
      <DropdownStyled>
        <DropdownButton type="button" onClick={this.handleClick}>
          {this.props.children}
        </DropdownButton>
        <DropdownMenu className={isShow ? 'show' : ''}>
          {lists.map((name, index) => (
            <DropdownItem key={index} href="#">
              {name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </DropdownStyled>
    );
  }
}
