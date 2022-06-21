import React from 'react';
import './App.css';

import {
  Switch,
  BrowserRouter,
  Route,
  Link,
  RouteProps,
  RouteChildrenProps,
  NavLink,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                exact
                activeStyle={{
                  background: 'red',
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" activeClassName="active">
                Users
              </NavLink>
            </li>
          </ul>
        </nav>

        <div>
          <span>Switch</span>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/users" component={Users} />
            <Route path="/test" component={Test} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>

        <div>
          <span>Side bar</span>
          <Route path="/" component={Test} />
        </div>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Users(props: RouteChildrenProps) {
  console.log(props);
  return (
    <div>
      <h1>Users</h1>
      <Link to={'/test'}>User Posts</Link>

      <Switch>
        <Route path={`/users/test`} component={Posts} />
      </Switch>
    </div>
  );
}

function Posts() {
  return <div>Posts</div>;
}

function NotMatch() {
  return <h1>404 Not Found</h1>;
}

function Test() {
  return <div>Test Component</div>;
}

export default App;
