import React, { useEffect, useState } from 'react';
import '../styles/CarsList.css';
import { useNavigate } from 'react-router-dom';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    mileageMin: '',
    mileageMax: '',
    CvMax: '',
    CvMin: '',
    fuel: '',
    color: ''
  });
  const navigate = useNavigate();

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
      setFilteredCars(data);
    })
    .catch((error) => {
      console.error('Erro ao buscar carros:', error);
    });
  }, []);

  // Função para atualizar os filtros conforme as mudanças nos inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Função para aplicar os filtros
  const applyFilters = () => {
    let filtered = cars.filter((car) => {
      const meetsPrice =
        (!filters.priceMin || car.price >= filters.priceMin) &&
        (!filters.priceMax || car.price <= filters.priceMax);
      const meetsBrand = !filters.brand || car.brand.includes(filters.brand);
      const meetsYear =
        (!filters.yearMin || car.year >= filters.yearMin) &&
        (!filters.yearMax || car.year <= filters.yearMax);
      const meetsMileage =
        (!filters.mileageMin || car.mileage >= filters.mileageMin) &&
        (!filters.mileageMax || car.mileage <= filters.mileageMax);
      const meetsCv =
        (!filters.CvMax || car.Cv <= filters.CvMax) &&
        (!filters.CvMin || car.Cv >= filters.CvMin);
      const meetsFuel = !filters.fuel || car.fuel === filters.fuel;
      const meetsColor = !filters.color || car.color === filters.color;

      return (
        meetsPrice &&
        meetsBrand &&
        meetsYear &&
        meetsMileage &&
        meetsFuel &&
        meetsColor
      );
    });
    setFilteredCars(filtered);
  };

  // Renderiza os filtros na barra lateral e os resultados dos carros
  return (
    <div className="cars-list-container">
      <div className="filters-sidebar">
        <h3>Filters</h3>

        <div className="filter-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            placeholder="e.g., Toyota"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="priceMin">Price Min (€)</label>
          <input
            type="number"
            id="priceMin"
            name="priceMin"
            value={filters.priceMin}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="priceMax">Price Max (€)</label>
          <input
            type="number"
            id="priceMax"
            name="priceMax"
            value={filters.priceMax}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="yearMin">Year Min</label>
          <input
            type="number"
            id="yearMin"
            name="yearMin"
            value={filters.yearMin}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="yearMax">Year Max</label>
          <input
            type="number"
            id="yearMax"
            name="yearMax"
            value={filters.yearMax}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="mileageMin">Mileage Min (km)</label>
          <input
            type="number"
            id="mileageMin"
            name="mileageMin"
            value={filters.mileageMin}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="mileageMax">Mileage Max (km)</label>
          <input
            type="number"
            id="mileageMax"
            name="mileageMax"
            value={filters.mileageMax}
            onChange={handleFilterChange}
          />
        </div>
{/*
        <div className="filter-group">
          <label htmlFor="CvMin">Cv Min</label>
          <input
            type="number"
            id="CvMin"
            name="CvMin"
            value={filters.CvMin}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="CvMax">Cv Max</label>
          <input
            type="number"
            id="CvMax"
            name="CvMax"
            value={filters.CvMax}
            onChange={handleFilterChange}
          />
        </div> */ }

        <div className="filter-group">
          <label htmlFor="fuel">Fuel</label>
          <input
            type="text"
            id="fuel"
            name="fuel"
            value={filters.fuel}
            onChange={handleFilterChange}
            placeholder="e.g., Diesel"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
            placeholder="e.g., Black"
          />
        </div>

        <button className="apply-filters-button" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      <div className="cars-list">
        <h2>Available Cars</h2>
        <div className="row">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="col-md-4"
              onClick={() => navigate(`/car/${car._id}`)}
            >
              <div className="card car-card">
                <img
                  src={car.images[0]}
                  className="card-img-top"
                  alt={car.brand + ' ' + car.model}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {car.brand} {car.model}
                  </h5>
                  <p className="card-text">Year: {car.year}</p>
                  <p className="card-text">Price: {car.price}€</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsList;