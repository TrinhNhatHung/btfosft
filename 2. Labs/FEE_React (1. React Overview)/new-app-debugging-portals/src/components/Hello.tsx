import React from 'react';

export class Hello extends React.Component<any> {
  render() {
    const { className } = this.props;
    return (
      <h1 className={className}>
        Hello Class
        <div>No Class</div>
        <div className="text">Text Class</div>
      </h1>
    );
  }
}