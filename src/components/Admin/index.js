import React from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

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

class CarRentalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: '',
      model: '',
      yearOfProd: '',
      quantityOfSeats: '',
      quantityOfDoors: '',
      transmission: '',
      fuelType: '',
      pricePerWeek: '',
      error: null,
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    event.persist();

    try {
      await this.props.firebase.cars().push(this.state);

      this.setState({
        brand: '',
        model: '',
        yearOfProd: '',
        quantityOfSeats: '',
        quantityOfDoors: '',
        transmission: '',
        fuelType: '',
        pricePerWeek: '',
      });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Brand:</label>
            <input
              type="text"
              value={this.state.brand}
              onChange={this.onChange}
              name="brand"
              placeholder="Audi"
            />
          </div>
          <div>
            <label>Model:</label>
            <input
              type="text"
              value={this.state.model}
              onChange={this.onChange}
              name="model"
              placeholder="Q5"
            />
          </div>
          <div>
            <label>Year of production:</label>
            <input
              type="text"
              value={this.state.yearOfProd}
              onChange={this.onChange}
              name="yearOfProd"
              placeholder="2019"
            />
          </div>
          <div>
            <label>Transmission type: </label>
            <select
              name="transmission"
              onChange={this.onChange}
              value={this.state.transmission}
            >
              <option value="" disabled hidden>
                Select transmission type
              </option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
          <div>
            <label>Quantity of seats:</label>
            <input
              type="number"
              min={2}
              max={10}
              value={this.state.quantityOfSeats}
              onChange={this.onChange}
              name="quantityOfSeats"
              placeholder="3"
            />
          </div>
          <div>
            <label>Quantity of doors:</label>
            <input
              type="number"
              min={2}
              max={7}
              value={this.state.quantityOfDoors}
              onChange={this.onChange}
              name="quantityOfDoors"
              placeholder="3"
            />
          </div>
          <div>
            <label>Fuel type: </label>
            <select
              name="fuelType"
              onChange={this.onChange}
              value={this.state.fuelType}
            >
              <option value="" disabled hidden>
                Select fuel type
              </option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="petrol/diesel">Petrol/diesel</option>
            </select>
          </div>
          <div>
            <label>Price per week:</label>
            <input
              type="text"
              value={this.state.pricePerWeek}
              onChange={this.onChange}
              name="pricePerWeek"
              placeholder="500"
            />
          </div>
          <button type="submit">Create</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default withRouter(Admin);
