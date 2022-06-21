import React, { Component } from 'react';

import './Dropdown.css';

interface DropdownProps {
  lists: string[];
}

interface DropdownState {
  isShow: boolean;
}

// PRACTICE 1: convert to Styled Component
// PRACTICE 1: using CSS Module 
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
      <div className={'dropdown ' + (isShow ? 'show' : '')}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleClick}
        >
          {this.props.children}
        </button>
        <div
          className={'dropdown-menu ' + (isShow ? 'show' : '')}
          aria-labelledby="dropdownMenuButton"
        >
          {lists.map((name, index) => (
            <a key={index} className="dropdown-item" href="#">
              {name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
