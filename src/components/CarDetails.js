import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaTachometerAlt, FaGasPump, FaCogs, FaBolt } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import '../styles/CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

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

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-content')) {
      handleCloseModal();
    }
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
              onClick={handleImageClick}
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
            <p><strong>Mileage:</strong> {car.mileage} km</p>
          </div>
          <div className="car-info-item">
            <FaGasPump className="car-info-icon" />
            <p><strong>Fuel:</strong> {car.fuel}</p>
          </div>
          <div className="car-info-item">
            <FaCogs className="car-info-icon" />
            <p><strong>Gearbox:</strong> {car.gearbox}</p>
          </div>
          <div className="car-info-item">
            <FaBolt className="car-info-icon" />
            <p><strong>Power:</strong> {car.power} hp</p>
          </div>
        </div>

        <div className="seller-info">
          <button className="contact-seller">Contact Seller</button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <div className="modal-dialog" onClick={handleModalClick}>
          <div className="modal-content">
            <div className="modal-body">
              <img 
                src={car.images[currentImageIndex]} 
                alt={`${car.brand} ${car.model}`} 
                className="modal-image"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CarDetails;