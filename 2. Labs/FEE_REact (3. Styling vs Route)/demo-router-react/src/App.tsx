import React, { Component, ChangeEvent } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch, NavLink, RouteChildrenProps, Redirect, Prompt } from 'react-router-dom';
import Topics from './Topics';
class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { isLogin: false };
    }
    handleLogin = () => {
        this.setState({ isLogin: true });
    };
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <header>
                        <nav>
                            <ul>
                                <li>
                                    <NavLink exact to="/" activeClassName="active">
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/about" activeClassName="active">
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/users" activeClassName="active">
                                        users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/members" activeClassName="active">
                                        members
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login" activeClassName="active">
                                        Login
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <main>
                        main
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/members" component={Members} />
                            <Route path="/users" render={() => (this.state.isLogin ? <Users /> : <Redirect to="/login" />)}></Route>
                            <Route path="/login">
                                <h1>Login</h1>
                                <h2>Status: {this.state.isLogin ? 'loggedin' : null}</h2>
                                <button onClick={this.handleLogin}>Login </button>
                            </Route>
                        </Switch>
                    </main>
                    <footer> copy right fsoft</footer>
                </div>
            </BrowserRouter>
        );
    }
}
const Home = () => {
    return <h1>Home</h1>;
};
const About = () => <h1>About</h1>;
class Members extends Component<any, any> {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/members/1"> goto Member 1 Detail </Link>
                    </li>
                    <li>
                        <Link to="/members/2"> goto Member 2 Detail </Link>
                    </li>
                    <li>
                        <Link to="/members/3"> goto Member 2 Detail </Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/members/:id" component={MemberDetail}></Route>
                </Switch>
                <Topics></Topics>
            </div>
        );
    }
}
class MemberDetail extends Component<RouteChildrenProps, any> {
    render() {
        return <h1>Member Detail {(this.props.match?.params as any).id} </h1>;
    }
}
class Users extends Component<any, any> {
    state = {
        text: '',
    };
    handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ text: event.target.value });
    };
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/users/?userid=1&name=user1"> goto User1 Detail </Link>
                    </li>
                    <li>
                        <Link to="/users/?userid=2&name=user2"> goto User2 Detail </Link>
                    </li>
                    <li>
                        <Link to="/users/?userid=3&name=user3"> goto User3 Detail </Link>
                    </li>
                </ul>
                <Prompt when={this.state.text.length > 0} message="do you want to go"></Prompt>
                <textarea onChange={this.handleChange}></textarea>
                <Switch>
                    <Route path="/users" component={UserDetail}></Route>
                </Switch>
                <Topics></Topics>
            </div>
        );
    }
}
class UserDetail extends Component<RouteChildrenProps, any> {
    render() {
        let queryParam = new URLSearchParams(this.props.location.search);
        console.log(queryParam.get('userid'));
        return (
            <h1>
                User Detail {queryParam.get('userid')} - {queryParam.get('name')}
            </h1>
        );
    }
}
export default App;
