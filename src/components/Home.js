import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
      <h2>Welcome to Our Car Dealership</h2>
      <p>Find your dream car with us!</p>

      <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://via.placeholder.com/800x300" className="d-block w-100" alt="Car 1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Audi RS6 Avant</h5>
              <p>Luxury and performance in one package.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/800x300" className="d-block w-100" alt="Car 2" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Ford Mustang 2021</h5>
              <p>The muscle car you always wanted.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/800x300" className="d-block w-100" alt="Car 3" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Chevrolet Camaro</h5>
              <p>Style and speed for the car enthusiast.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
