class HelloComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Anh</h1>
        <h1>Hello Binh</h1>
        <h1>Hello Chung</h1>
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement(HelloComponent),
  document.getElementById('react')
);
