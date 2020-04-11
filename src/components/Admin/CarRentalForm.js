import React from 'react';

class CarRentalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: '',
      model: '',
      engineType: '',
      yearOfProd: '',
      quantityOfSeats: '',
      quantityOfDoors: '',
      transmission: '',
      fuelType: '',
      pricePerWeek: '',
      error: null,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.persist();

    this.props.firebase
      .cars()
      .push(this.state)
      .then(() => {
        this.setState({
          brand: '',
          model: '',
          engineType: '',
          yearOfProd: '',
          quantityOfSeats: '',
          quantityOfDoors: '',
          transmission: '',
          fuelType: '',
          pricePerWeek: '',
        });
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
    const isInvalid =
      this.state.brand === '' ||
      this.state.model === '' ||
      this.state.engineType === '' ||
      this.state.yearOfProd === '' ||
      this.state.quantityOfDoors === '' ||
      this.state.quantityOfSeats === '' ||
      this.state.transmission === '' ||
      this.state.fuelType === '' ||
      this.state.pricePerWeek === '';

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
            <label>Engine type:</label>
            <input
              type="text"
              value={this.state.engineType}
              onChange={this.onChange}
              name="engineType"
              placeholder="2.5 TD"
            />
          </div>
          <div>
            <label>Year of production:</label>
            <input
              type="number"
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
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
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
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div>
            <label>Price per week:</label>
            <input
              type="number"
              value={this.state.pricePerWeek}
              onChange={this.onChange}
              name="pricePerWeek"
              placeholder="500"
            />
          </div>
          <button type="submit" disabled={isInvalid}>
            Create
          </button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default CarRentalForm;
