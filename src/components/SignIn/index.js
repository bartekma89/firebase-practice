import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './signIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (this.props.condition(authUser)) {
        this.props.history.push(ROUTES.HOME);
      } else {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.persist();

    this.props.firebase
      .setPersistance(this.props.firebase.persistance.SESSION)
      .then(() => {
        return this.props.firebase.doSignInWithEmailAndPassword(
          this.state.email,
          this.state.password
        );
      })
      .then(() => {
        this.setState({
          email: '',
          password: '',
          error: null,
        });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const isInvalid = this.state.email === '' || this.state.password === '';
    return (
      <div>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" disabled={isInvalid}>
              Sign in
            </button>
            {this.state.error && <p>{this.state.error.message}</p>}
          </form>
        )}
      </div>
    );
  }
}

export default withRouter(SignIn);
