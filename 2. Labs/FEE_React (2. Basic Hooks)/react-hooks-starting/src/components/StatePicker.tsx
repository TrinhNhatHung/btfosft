import React, { ChangeEvent, Component } from 'react';

import styles from './StatePicker.module.css';

interface StatePickerProps {
  options: any[];
  selectedId?: number;
  onSelectState: (event: ChangeEvent<HTMLSelectElement>) => void;
}

class StatePicker extends Component<StatePickerProps> {
  render() {
    if (this.props.options.length === 0) {
      return <div>No Data</div>;
    }

    return (
      <div>
        <h4>Selected State: {this.props.selectedId}</h4>
        <select
          onChange={this.props.onSelectState}
          value={this.props.selectedId}
          className={styles.select}
        >
          {this.props.options.map((char: any) => (
            <option key={char.id} value={char.id}>
              {char.stateName}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default StatePicker;
