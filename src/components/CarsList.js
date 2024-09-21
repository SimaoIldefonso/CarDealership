import React, { useEffect, useState } from 'react';

const CarsList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/cars', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao buscar carros');
      }
      return response.json();
    })
    .then((data) => {
      setCars(data);
    })
    .catch((error) => {
      console.error('Erro ao buscar carros:', error);
    });
    
  }, []);
  

  if (cars.length === 0) {
    return <div>No cars available</div>;
  }

  return (
    <div>
      <h2>Available Cars</h2>
      <div className="row">
        {cars.map(car => (
          <div key={car._id} className="col-md-4">
            <div className="card">
              <img src={car.images[0]} className="card-img-top" alt={car.brand + ' ' + car.model} />
              <div className="card-body">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">Year: {car.year}</p>
                <p className="card-text">Price: {car.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsList;
