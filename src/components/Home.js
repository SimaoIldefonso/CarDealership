import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/cars')
      .then(response => setCars(response.data.slice(0, 3))) 
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handleNextCar = () => {
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const handlePreviousCar = () => {
    setCurrentCarIndex((prevIndex) => 
      prevIndex === 0 ? cars.length - 1 : prevIndex - 1
    );
  };

  if (cars.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <h2>Welcome to Our Car Dealership</h2>
      <p>Find your dream car with us!</p>

      <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {cars.map((car, index) => (
            <div 
              key={car._id} 
              className={`carousel-item ${index === currentCarIndex ? 'active' : ''}`} 
              onClick={() => handleCarClick(car._id)}
            >
              <img src={car.images[0]} className="d-block w-100 car-image" alt={car.name} />

            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={handlePreviousCar}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={handleNextCar}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="carousel-indicators">
          {cars.map((_, index) => (
            <button 
              key={index} 
              type="button" 
              data-bs-target="#carCarousel" 
              data-bs-slide-to={index} 
              className={index === currentCarIndex ? 'active' : ''}
              aria-current={index === currentCarIndex ? 'true' : 'false'}
            ></button>
          ))}
          </div>
      </div>
    </div>
  );
};

export default Home;