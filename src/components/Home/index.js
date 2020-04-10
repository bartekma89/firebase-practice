import React from 'react';

import CarList from './CarList';

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

  componentWillUnmount() {
    this.props.firebase.cars().off();
  }

  onRemoveCar = (carId) => {
    this.props.firebase.car(carId).remove();
  };

  onEditCar = (car, data) => {
    this.props.firebase.car(car.uid).set({
      ...data,
    });
  };

  render() {
    return (
      <div>
        <h1>Cars to rent</h1>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <CarList
            cars={this.state.cars}
            onRemoveCar={this.onRemoveCar}
            onEditCar={this.onEditCar}
            authUser={this.props.authUser}
          />
        )}
      </div>
    );
  }
}

export default Home;
