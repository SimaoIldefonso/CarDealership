import React, { useContext, useEffect, useState, useCallback } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../styles/CarsList.css';

const CarsList = () => {
  const {
    setFilters,
    tempFilters,
    setTempFilters,
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
  const navigate = useNavigate();

  // Aplicar os filtros somente ao clicar no botão "Apply Filters"
  const applyFilters = useCallback(() => {
    const filtered = cars.filter((car) => {
      const meetsPrice =
        (!tempFilters.priceMin || car.price >= Number(tempFilters.priceMin)) &&
        (!tempFilters.priceMax || car.price <= Number(tempFilters.priceMax));
      const meetsBrand = !tempFilters.brand || car.brand.toLowerCase().includes(tempFilters.brand.toLowerCase());
      const meetsYear =
        (!tempFilters.yearMin || car.year >= Number(tempFilters.yearMin)) &&
        (!tempFilters.yearMax || car.year <= Number(tempFilters.yearMax));
      const meetsMileage =
        (!tempFilters.mileageMin || car.mileage >= Number(tempFilters.mileageMin)) &&
        (!tempFilters.mileageMax || car.mileage <= Number(tempFilters.mileageMax));
      const meetsFuel = !tempFilters.fuel || car.fuel === tempFilters.fuel;
      const meetsColor = !tempFilters.color || car.color === tempFilters.color;
      const meetsDoors = !tempFilters.doors || car.doors === Number(tempFilters.doors);

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
    setFilters(tempFilters); // Atualizar os filtros principais após aplicar
  }, [cars, tempFilters, setFilteredCars, setFilters]);

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
        const uniqueDoors = [...new Set(data.map((car) => car.doors))];
        setColors(uniqueColors);
        setFuels(uniqueFuels);
        setDoors(uniqueDoors);
        setFilteredCars(data); // Exibir todos os carros inicialmente
      })
      .catch((error) => {
        console.error('Erro ao buscar carros:', error);
      });
  }, [setCars, setFilteredCars, setColors, setFuels, setDoors]);

  // Atualiza o filtro temporário com os valores inseridos
  const handleTempFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilters({ ...tempFilters, [name]: value });
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
            value={tempFilters.brand}
            onChange={handleTempFilterChange}
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
            onChange={(value) => {
              setTempFilters({ ...tempFilters, priceMin: value[0], priceMax: value[1] });
              setPriceRange(value);
            }}
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
            value={tempFilters.yearMin}
            onChange={handleTempFilterChange}
            placeholder="Min Year"
          />
          <input
            type="number"
            id="yearMax"
            name="yearMax"
            value={tempFilters.yearMax}
            onChange={handleTempFilterChange}
            placeholder="Max Year"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="mileageMin">Mileage (KM)</label>
          <input
            type="number"
            id="mileageMin"
            name="mileageMin"
            value={tempFilters.mileageMin}
            onChange={handleTempFilterChange}
            placeholder="Min KM"
          />
          <input
            type="number"
            id="mileageMax"
            name="mileageMax"
            value={tempFilters.mileageMax}
            onChange={handleTempFilterChange}
            placeholder="Max KM"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="doors">Number of Doors</label>
          <select
            id="doors"
            name="doors"
            value={tempFilters.doors}
            onChange={handleTempFilterChange}
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
            value={tempFilters.fuel}
            onChange={handleTempFilterChange}
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
            value={tempFilters.color}
            onChange={handleTempFilterChange}
          >
            <option value="">All Colors</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <button className="apply-filters-button" onClick={applyFilters}>
          Apply Filters
        </button>
        <button
          className="reset-filters-button"
          onClick={() => {
            setTempFilters({
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
          }}
        >
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
                  alt={`${car.brand} ${car.model}`}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {car.brand} {car.model}
                  </h5>
                  <p className="card-text">
                    Price: {car.price} € | Year: {car.year} 
                  </p>

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