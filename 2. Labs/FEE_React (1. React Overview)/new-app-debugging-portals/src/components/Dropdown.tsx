import React, { Component } from 'react';

import styles from './Dropdown.module.css';

interface DropdownProps {
  lists: string[];
}

interface DropdownState {
  isShow: boolean;
  value: any;
}

export class Dropdown extends Component<DropdownProps, DropdownState> {
  constructor(props: any) {
    super(props);

    this.state = { isShow: false, value: { name: 'Anh' } };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      isShow: !prevState.isShow,
      value: undefined,
    }));
  };

  render() {
    const { lists } = this.props;
    const {
      isShow,
      value: { name },
    } = this.state;

    return (
      <div className={styles.dropdown}>
        <h1>{name}</h1>
        <button
          className={styles.dropdownButton}
          type="button"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleClick}
        >
          {this.props.children}
        </button>
        <div
          className={isShow ? styles.dropdownMenuShow : styles.dropdownMenu}
          aria-labelledby="dropdownMenuButton"
        >
          {lists.map((name, index) => (
            <a className={styles.dropdownItem} key={index} href="#">
              {name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
