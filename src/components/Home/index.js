import React from 'react';

class Home extends React.Component {
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

    this.props.firebase.cars().on('value', (snapshot) => {
      const carObject = snapshot.val();

      if (carObject) {
        const carList = Object.keys(carObject).map((key) => {
          return { ...carObject[key], uid: key };
        });

        this.setState({
          cars: carList,
          isLoading: false,
        });
      } else {
        this.setState({
          cars: [],
          isLoading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.cars().off();
  }

  onRemoveCar = (carId) => {
    this.props.firebase.car(carId).remove();
  };

  render() {
    return (
      <div>
        <h1>Cars to rent</h1>
        {this.state.cars.length > 0 && this.state.cars ? (
          this.state.cars.map((el, index) => {
            return (
              <div key={index.toString()}>
                <ul>
                  <li>Brand: {el.brand}</li>
                  <li>Model: {el.model}</li>
                  <li>Year of production: {el.yearOfProd}</li>
                  <li>Quantity of seats: {el.quantityOfSeats}</li>
                  <li>Quantity of doors: {el.quantityOfDoors}</li>
                  <li>Transmission: {el.transmission}</li>
                  <li>Fuel type: {el.fuelType}</li>
                  <li>Price per week: {el.pricePerWeek} zł</li>
                </ul>
                <button type="button" onClick={() => this.onRemoveCar(el.uid)}>
                  Delete
                </button>
              </div>
            );
          })
        ) : (
          <div>No cars to rent</div>
        )}
      </div>
    );
  }
}

export default Home;
