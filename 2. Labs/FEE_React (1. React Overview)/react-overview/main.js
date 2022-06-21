class HelloComponent extends React.Component {
  render() {
    return React.createElement('h1', undefined, 'Hello Fresher');
  }
}

ReactDOM.render(
  React.createElement(HelloComponent),
  document.getElementById('react'));

  