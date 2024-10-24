import React, { useContext, useEffect, useState, useCallback } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../styles/CarsList.css';

const CarsList = () => {
  const {
    filters,
    setFilters,
    filteredCars,
    setFilteredCars,
    cars,
    setCars,
    colors,
    setColors,
    fuels,
    setFuels
  } = useContext(FiltersContext);

  const [priceRange, setPriceRange] = useState([50000, 800000]);
  const [doors, setDoors] = useState([]); // Adicionar estado para portas
  const navigate = useNavigate(); // Certifique-se de que useNavigate está sendo chamado corretamente

  const applyFilters = useCallback((carsToFilter = cars, filtersToApply = filters) => {
    let filtered = carsToFilter.filter((car) => {
      const meetsPrice =
        (!filtersToApply.priceMin || car.price >= Number(filtersToApply.priceMin)) &&
        (!filtersToApply.priceMax || car.price <= Number(filtersToApply.priceMax));
      const meetsBrand = !filtersToApply.brand || car.brand.toLowerCase().includes(filtersToApply.brand.toLowerCase());
      const meetsYear =
        (!filtersToApply.yearMin || car.year >= Number(filtersToApply.yearMin)) &&
        (!filtersToApply.yearMax || car.year <= Number(filtersToApply.yearMax));
      const meetsMileage =
        (!filtersToApply.mileageMin || car.mileage >= Number(filtersToApply.mileageMin)) &&
        (!filtersToApply.mileageMax || car.mileage <= Number(filtersToApply.mileageMax));
      const meetsFuel = !filtersToApply.fuel || car.fuel === filtersToApply.fuel;
      const meetsColor = !filtersToApply.color || car.color === filtersToApply.color;
      const meetsDoors = !filtersToApply.doors || car.doors === Number(filtersToApply.doors);

      return (
        meetsPrice &&
        meetsBrand &&
        meetsYear &&
        meetsMileage &&
        meetsFuel &&
        meetsColor &&
        meetsDoors
      );
    });
    setFilteredCars(filtered);
  }, [cars, filters, setFilteredCars]);

  useEffect(() => {
    fetch('http://localhost:3001/api/cars')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCars(data);

        const uniqueColors = [...new Set(data.map((car) => car.color))];
        const uniqueFuels = [...new Set(data.map((car) => car.fuel))];
        const uniqueDoors = [...new Set(data.map((car) => car.doors))]; // Obter portas únicas
        setColors(uniqueColors);
        setFuels(uniqueFuels);
        setDoors(uniqueDoors); // Definir portas únicas
      })
      .catch((error) => {
        console.error('Erro ao buscar carros:', error);
      });
  }, [setCars, setFilteredCars, setColors, setFuels, setDoors]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handlePriceSliderChange = (value) => {
    setFilters({ ...filters, priceMin: value[0], priceMax: value[1] });
    setPriceRange(value);
  };

  const handleResetFilters = () => {
    setFilters({
      brand: '',
      priceMin: '',
      priceMax: '',
      yearMin: '',
      yearMax: '',
      mileageMin: '',
      mileageMax: '',
      fuel: '',
      color: '',
      doors: ''
    });
    setPriceRange([50000, 800000]);
    setFilteredCars(cars);
  };

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
          <label htmlFor="price">Price Range (€)</label>
          <Slider
            range
            min={50000}
            max={800000}
            step={1000}
            value={priceRange}
            onChange={handlePriceSliderChange}
            trackStyle={{ backgroundColor: '#27485f', height: 5 }}
            handleStyle={{
              borderColor: '#27485f',
              height: 18,
              width: 18,
              marginLeft: -9,
              marginTop: -7,
              backgroundColor: '#fff'
            }}
            railStyle={{ backgroundColor: '#ccc', height: 5 }}
          />
          <div className="price-labels">
            <span>{priceRange[0]} €</span>
            <span>{priceRange[1]} €</span>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="yearMin">Year Range</label>
          <input
            type="number"
            id="yearMin"
            name="yearMin"
            value={filters.yearMin}
            onChange={handleFilterChange}
            placeholder="Min Year"
          />
          <input
            type="number"
            id="yearMax"
            name="yearMax"
            value={filters.yearMax}
            onChange={handleFilterChange}
            placeholder="Max Year"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="mileageMin">Mileage (KM)</label>
          <input
            type="number"
            id="mileageMin"
            name="mileageMin"
            value={filters.mileageMin}
            onChange={handleFilterChange}
            placeholder="Min KM"
          />
          <input
            type="number"
            id="mileageMax"
            name="mileageMax"
            value={filters.mileageMax}
            onChange={handleFilterChange}
            placeholder="Max KM"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="doors">Number of Doors</label>
          <select
            id="doors"
            name="doors"
            value={filters.doors}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {doors.map((door, index) => (
              <option key={index} value={door}>
                {door}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="fuel">Fuel</label>
          <select
            id="fuel"
            name="fuel"
            value={filters.fuel}
            onChange={handleFilterChange}
          >
            <option value="">All Fuels</option>
            {fuels.map((fuel, index) => (
              <option key={index} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="color">Color</label>
          <select
            id="color"
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
          >
            <option value="">All Colors</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <button className="apply-filters-button" onClick={() => applyFilters(cars, filters)}>
          Apply Filters
        </button>
        <button className="reset-filters-button" onClick={handleResetFilters}>
          Reset Filters
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