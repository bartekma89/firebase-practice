import React from 'react';

import CarItem from './CarItem';

class CarList extends React.Component {
  render() {
    return this.props.cars.length > 0 && this.props.cars ? (
      this.props.cars.map((car, index) => {
        return (
          <CarItem
            key={index.toString()}
            car={car}
            onRemoveCar={this.props.onRemoveCar}
            onEditCar={this.props.onEditCar}
            authUser={this.props.authUser}
          />
        );
      })
    ) : (
      <div>No cars to rent</div>
    );
  }
}

export default CarList;
