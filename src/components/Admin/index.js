import React from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import CarRentalForm from './CarRentalForm';

import './admin.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cars: [],
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (!this.props.condition(authUser)) {
        this.props.history.push(ROUTES.SIGNIN);
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

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>Admin panel</h1>
            <p>This page is available only for admin</p>
            <CarRentalForm firebase={this.props.firebase} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Admin);
