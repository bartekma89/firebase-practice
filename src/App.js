import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Landing from './components/Landing';
import Home from './components/Home';
import Contact from './components/Contact';
import SignIn from './components/SignIn';
import About from './components/About';
import Admin from './components/Admin';
import * as ROUTES from './constants/routes';
import Firebase from './components/Firebase';

import './App.css';

const firebase = new Firebase();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: JSON.parse(localStorage.getItem('authUser')),
    };
  }

  componentDidMount() {
    this.listener = firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        this.setState({ authUser });
      } else {
        localStorage.removeItem('authUser');
        this.setState({ authUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  conditionToAccess = (authUser) => !!authUser;

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navigation authUser={this.state.authUser} firebase={firebase} />
            <hr />
            <Route exact path={ROUTES.LANDING}>
              <Landing></Landing>
            </Route>
            <Route path={ROUTES.HOME}>
              <Home firebase={firebase} authUser={this.state.authUser}></Home>
            </Route>
            <Route path={ROUTES.CONTACT}>
              <Contact firebase={firebase}></Contact>
            </Route>
            <Route path={ROUTES.SIGNIN}>
              <SignIn
                firebase={firebase}
                condition={this.conditionToAccess}
                setUserId={this.setUserId}
              ></SignIn>
            </Route>
            <Route path={ROUTES.ABOUT}>
              <About></About>
            </Route>
            <Route path={ROUTES.ADMIN}>
              <Admin
                firebase={firebase}
                condition={this.conditionToAccess}
              ></Admin>
            </Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
