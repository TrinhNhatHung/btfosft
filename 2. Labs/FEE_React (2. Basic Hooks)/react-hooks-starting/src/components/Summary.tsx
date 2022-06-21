import React, { Component } from 'react';
import { ElectionState } from '../election.model';

import styles from './Summary.module.css';

interface SummaryProps {
  state?: ElectionState;
}

class Summary extends Component<SummaryProps> {
  render() {
    return (
      <div className={styles.summary}>
        <span>Summary</span>
        <h1>State name: {this.props.state?.stateName}</h1>
        <p>
          Number of Electoral votes:{' '}
          <span className={styles.output}>{this.props.state?.electoralVotes}</span>
        </p>
        {this.props.state?.candidates.map((candidate) => (
          <p key={candidate.id}>
            <span>Number of vote for { candidate.fullName } </span>
            <span className={styles.output}>{candidate.vote}</span>
          </p>
        ))}
      </div>
    );
  }
}

export default Summary;
