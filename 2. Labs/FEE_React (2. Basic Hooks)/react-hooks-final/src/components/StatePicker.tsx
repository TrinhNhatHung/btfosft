import React, { ChangeEvent } from 'react';

import styles from './StatePicker.module.css';

interface StatePickerProps {
  options: any[];
  selectedId?: number;
  onSelectState: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const StatePicker = (props: StatePickerProps) => {
  if (props.options.length === 0) {
    return <div>No Data</div>;
  }

  return (
    <div>
      <h4>Selected State: {props.selectedId}</h4>
      <select
        onChange={props.onSelectState}
        value={props.selectedId}
        className={styles.select}
      >
        {props.options.map((char: any) => (
          <option key={char.id} value={char.id}>
            {char.stateName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatePicker;
