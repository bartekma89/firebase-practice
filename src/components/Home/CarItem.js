import React from 'react';

class CarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      brand: this.props.car.brand,
      model: this.props.car.model,
      engineType: this.props.car.engineType,
      yearOfProd: this.props.car.yearOfProd,
      quantityOfSeats: this.props.car.quantityOfSeats,
      quantityOfDoors: this.props.car.quantityOfDoors,
      transmission: this.props.car.transmission,
      fuelType: this.props.car.fuelType,
      pricePerWeek: this.props.car.pricePerWeek,
    };
  }

  onToogleEditMode = () => {
    this.setState((state) => {
      return {
        editMode: !state.editMode,
        brand: this.props.car.brand,
        model: this.props.car.model,
        engineType: this.props.car.engineType,
        yearOfProd: this.props.car.yearOfProd,
        quantityOfSeats: this.props.car.quantityOfSeats,
        quantityOfDoors: this.props.car.quantityOfDoors,
        transmission: this.props.car.transmission,
        fuelType: this.props.car.fuelType,
        pricePerWeek: this.props.car.pricePerWeek,
      };
    });
  };

  onSaveEditCar = () => {
    const editData = { ...this.state };
    delete editData.editMode;
    this.props.onEditCar(this.props.car, editData);

    this.setState({
      editMode: false,
    });
  };

  onChangeEditData = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const isInvalid =
      this.state.brand === '' ||
      this.state.model === '' ||
      this.state.engineType === '' ||
      this.state.yearOfProd < 1 ||
      this.state.quantityOfSeats < 2 ||
      this.state.quantityOfDoors < 2 ||
      this.state.transmission === '' ||
      this.state.fuelType === '' ||
      this.state.pricePerWeek < 1;
    return (
      <div>
        {this.state.editMode ? (
          <ul>
            <li>
              Brand:{' '}
              <input
                name="brand"
                type="text"
                onChange={this.onChangeEditData}
                value={this.state.brand}
              />
            </li>
            <li>
              Model:{' '}
              <input
                name="model"
                type="text"
                onChange={this.onChangeEditData}
                value={this.state.model}
              />
            </li>
            <li>
              Engine type:{' '}
              <input
                name="engineType"
                type="text"
                onChange={this.onChangeEditData}
                value={this.state.engineType}
              />
            </li>
            <li>
              Year of production:{' '}
              <input
                name="yearOfProd"
                type="number"
                min={1}
                onChange={this.onChangeEditData}
                value={this.state.yearOfProd}
              />
            </li>
            <li>
              Quantity of seats:{' '}
              <input
                name="quantityOfSeats"
                type="number"
                min={2}
                value={this.state.quantityOfSeats}
                onChange={this.onChangeEditData}
              />
            </li>
            <li>
              Quantity of doors:{' '}
              <input
                name="quantityOfDoors"
                type="number"
                min={2}
                value={this.state.quantityOfDoors}
                onChange={this.onChangeEditData}
              />
            </li>
            <li>
              Transmission:{' '}
              <select
                name="transmission"
                value={this.state.transmission}
                onChange={this.onChangeEditData}
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </li>
            <li>
              Fuel type:{' '}
              <select
                name="fuelType"
                value={this.state.fuelType}
                onChange={this.onChangeEditData}
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </li>
            <li>
              Price per week:{' '}
              <input
                name="pricePerWeek"
                type="number"
                min={1}
                onChange={this.onChangeEditData}
                value={this.state.pricePerWeek}
              />
            </li>
          </ul>
        ) : (
          <ul>
            <li>Brand: {this.props.car.brand}</li>
            <li>Model: {this.props.car.model}</li>
            <li>Engine type: {this.props.car.engineType}</li>
            <li>Year of production: {this.props.car.yearOfProd}</li>
            <li>Quantity of seats: {this.props.car.quantityOfSeats}</li>
            <li>Quantity of doors: {this.props.car.quantityOfDoors}</li>
            <li>Transmission: {this.props.car.transmission}</li>
            <li>Fuel type: {this.props.car.fuelType}</li>
            <li>Price per week: {this.props.car.pricePerWeek} zł</li>
          </ul>
        )}
        {this.props.authUser && (
          <div>
            {this.state.editMode ? (
              <span>
                <button
                  type="button"
                  onClick={this.onSaveEditCar}
                  disabled={isInvalid}
                >
                  Save
                </button>
                <button type="button" onClick={this.onToogleEditMode}>
                  Reset
                </button>
              </span>
            ) : (
              <button type="button" onClick={this.onToogleEditMode}>
                Edit
              </button>
            )}
            {!this.state.editMode && (
              <button
                type="button"
                onClick={() => this.props.onRemoveCar(this.props.car.uid)}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default CarItem;
