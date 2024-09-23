// CarDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaTachometerAlt, FaGasPump, FaCogs, FaBolt } from 'react-icons/fa';
import '../styles/CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/api/cars/${id}`)
      .then(response => response.json())
      .then(data => setCar(data))
      .catch(error => console.error('Erro ao buscar detalhes do carro:', error));
  }, [id]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="car-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaChevronLeft /> Back
      </button>
      
      <div className="car-details-content">
        <h1>{car.brand} {car.model}</h1>
        
        <div className="car-image-container">
          <button className="image-nav left" onClick={handlePreviousImage}>
            <FaArrowLeft />
          </button>
          {car.images && car.images.length > 0 ? (
            <img 
              src={car.images[currentImageIndex]} 
              alt={`${car.brand} ${car.model}`} 
              className="car-image"
            />
          ) : (
            <p>No images available</p>
          )}
          <button className="image-nav right" onClick={handleNextImage}>
            <FaArrowRight />
          </button>
        </div>

        <div className="thumbnails">
          {car.images && car.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`${car.brand} ${car.model} thumbnail`} 
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        <div className="car-info">
          <div className="car-info-item">
            <FaTachometerAlt className="car-info-icon" />
            <p><strong>Quilómetros:</strong> {car.mileage} km</p>
          </div>
          <div className="car-info-item">
            <FaGasPump className="car-info-icon" />
            <p><strong>Combustível:</strong> {car.fuel}</p>
          </div>
          <div className="car-info-item">
            <FaCogs className="car-info-icon" />
            <p><strong>Tipo de Caixa:</strong> {car.gearbox}</p>
          </div>
          <div className="car-info-item">
            <FaBolt className="car-info-icon" />
            <p><strong>Potência:</strong> {car.power} cv</p>
          </div>
        </div>

        <div className="seller-info">
          <button className="contact-seller">Contactar vendedor</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
