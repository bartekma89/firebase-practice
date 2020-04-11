import React from 'react';

import './contact.css';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      city: '',
      street: '',
      houseNumber: '',
      postalCode: '',
      phoneNumber: '',
      carPrice: '',
      lengthOfLoan: 1,
      insurance: false,
      fuelType: '',
      errors: {},
      summary: null,
      isLoading: false,
      cars: [],
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    this.props.firebase.cars().on('value', (snapshot) => {
      const carObject = snapshot.val();
      let carList = [];

      if (carObject) {
        carList = Object.keys(carObject).map((key) => {
          return { ...carObject[key], uid: key };
        });
      }

      this.setState({
        cars: carList,
        isLoading: false,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.summary && this.state.insurance !== prevState.insurance) ||
      (this.state.summary && this.state.fuelType !== prevState.fuelType)
    ) {
      this.onCalculate();
    }
  }

  componentWillUnmount() {
    this.props.firebase.cars().off();
  }

  onCalculate = () => {
    const additionalCharge = 1.04;
    const fuelTypeCharge = this.state.fuelType === 'Diesel' ? 1.05 : 1;
    const insuranceStatus = this.state.insurance ? additionalCharge : 1;
    const rentPrice =
      this.state.carPrice *
      this.state.lengthOfLoan *
      insuranceStatus *
      fuelTypeCharge;

    this.setState({
      summary: rentPrice,
    });
  };

  onChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validationFields(name, value);
      }
    );
  };

  validationFields = (name, value) => {
    let fieldValidationErrors = {};
    let isEmailValid = true;
    let isPostalCodeValid = true;
    let isPhoneNumberValid = true;

    switch (name) {
      case 'email':
        isEmailValid = value.match(/^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i);
        fieldValidationErrors.email = isEmailValid
          ? ''
          : 'Email has wrong format';
        break;
      case 'postalCode':
        isPostalCodeValid = value.match(/[0-9]{2}-[0-9]{3}/g);
        fieldValidationErrors.postalCode = isPostalCodeValid
          ? ''
          : 'Postal code has wrong format';
        break;
      case 'phoneNumber':
        isPhoneNumberValid = value.match(/^[(+?)0-9]{9,15}$/g);
        fieldValidationErrors.phoneNumber = isPhoneNumberValid
          ? ''
          : 'Phone number has wrong format';
        break;
      default:
        break;
    }

    this.setState((prevState) => {
      return {
        errors: { ...prevState.errors, ...fieldValidationErrors },
      };
    });
  };

  render() {
    const isInvalid =
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.age === '' ||
      this.state.email === '' ||
      this.state.city === '' ||
      this.state.street === '' ||
      this.state.houseNumber === '' ||
      this.state.postalCode === '' ||
      this.state.phoneNumber === '' ||
      this.state.carPrice === '' ||
      this.state.fuelType === '';
    return (
      <div>
        <h1>Calculation of the car rental price</h1>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <form>
              <div>
                <label>First name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  placeholder="John"
                />
              </div>
              <div>
                <label>Last name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={this.state.lasttName}
                  onChange={this.onChange}
                  placeholder="Doe"
                />
              </div>
              <div>
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={this.state.age}
                  onChange={this.onChange}
                  placeholder="18"
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="johnDoe@example.com"
                />
                {this.state.errors.email && <p>{this.state.errors.email}</p>}
              </div>
              <div>
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  placeholder="Lublin"
                />
              </div>
              <div>
                <label>Street:</label>
                <input
                  type="text"
                  name="street"
                  value={this.state.street}
                  onChange={this.onChange}
                  placeholder="Krakowskie Przedmieście"
                />
              </div>
              <div>
                <label>House number:</label>
                <input
                  type="number"
                  name="houseNumber"
                  value={this.state.houseNumber}
                  onChange={this.onChange}
                  placeholder="27"
                />
              </div>
              <div>
                <label>Postal code:</label>
                <input
                  type="text"
                  name="postalCode"
                  value={this.state.postalCode}
                  onChange={this.onChange}
                  placeholder="20-000"
                />
                {this.state.errors.postalCode && (
                  <p>{this.state.errors.postalCode}</p>
                )}
              </div>
              <div>
                <label>Phone number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  placeholder="999999999"
                />
                {this.state.errors.phoneNumber && (
                  <p>{this.state.errors.phoneNumber}</p>
                )}
              </div>
              <div>
                <label>Insurance:</label>
                <input
                  type="checkbox"
                  name="insurance"
                  checked={this.state.insurance}
                  onChange={this.onChange}
                />{' '}
                (Additional insurance costs 4% value of rent)
              </div>
              <div>
                <label>Card to rent:</label>
                <select
                  name="carPrice"
                  onChange={this.onChange}
                  value={this.state.carPrice}
                >
                  <option value="" disabled hidden>
                    Select car
                  </option>
                  {this.state.cars.map((el, index) => {
                    return (
                      <option key={index.toString()} value={el.pricePerWeek}>
                        {`${el.brand} ${el.model} ${el.engineType}`}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Type of fuel:</label>
                <div>
                  <label>Petrol</label>
                  <input
                    type="radio"
                    name="fuelType"
                    id="petrol"
                    value="Petrol"
                    disabled={this.state.disabledFuelType}
                    checked={this.state.fuelType === 'Petrol'}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <label>Diesel</label>
                  <input
                    type="radio"
                    name="fuelType"
                    id="diesel"
                    value="Diesel"
                    disabled={this.state.disabledFuelType}
                    checked={this.state.fuelType === 'Diesel'}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div>
                <label>Length of loan (weeks):</label>
                <input
                  type="number"
                  name="lengthOfLoan"
                  value={this.state.lengthOfLoan}
                  onChange={this.onChange}
                  placeholder="5"
                />
              </div>
              <button
                type="button"
                disabled={isInvalid}
                onClick={this.onCalculate}
              >
                Calculate the price
              </button>
            </form>
            {this.state.summary && (
              <div>
                <div>
                  Per day:{' '}
                  {Math.ceil(
                    this.state.summary / (this.state.lengthOfLoan * 7)
                  )}{' '}
                  zł
                </div>
                <div>Summary: {Math.ceil(this.state.summary)} zł</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Contact;
