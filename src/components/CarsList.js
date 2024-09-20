import React from 'react';
import AudiRS6 from './AudiRS6.png';

const CarsList = () => {
  const cars = [
    { id: 1, name: 'Audi RS6 Avant', year: 2022, image: AudiRS6 },
    { id: 2, name: 'Ford Mustang', year: 2021, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Chevrolet Camaro', year: 2020, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div>
      <h2>Available Cars</h2>
      <div className="row">
        {cars.map(car => (
          <div key={car.id} className="col-md-4">
            <div className="card">
              <img src={car.image} className="card-img-top" alt={car.name} />
              <div className="card-body">
                <h5 className="card-title">{car.name}</h5>
                <p className="card-text">Year: {car.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsList;
