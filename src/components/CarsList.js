import React, { useEffect, useState } from 'react';
import '../styles/CarsList.css';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider'; // Instale a biblioteca: npm install rc-slider
import 'rc-slider/assets/index.css';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [colors, setColors] = useState([]);
  const [fuels, setFuels] = useState([]);/*
  const [horsepowerRange, setHorsepowerRange] = useState([100, 1000]);*/
  const [priceRange, setPriceRange] = useState([50000, 800000]);
  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    mileageMin: '',
    mileageMax: '',
    fuel: '',/*
    horsepowerMin: '',
    horsepowerMax: '', */
    color: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/cars', {
      method: 'GET'
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

        const uniqueColors = [...new Set(data.map((car) => car.color))];
        const uniqueFuels = [...new Set(data.map((car) => car.fuel))];
        setColors(uniqueColors);
        setFuels(uniqueFuels);
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
        (!filters.priceMin || car.price >= Number(filters.priceMin)) &&
        (!filters.priceMax || car.price <= Number(filters.priceMax));
      const meetsBrand = !filters.brand || car.brand.toLowerCase().includes(filters.brand.toLowerCase());
      const meetsYear =
        (!filters.yearMin || car.year >= Number(filters.yearMin)) &&
        (!filters.yearMax || car.year <= Number(filters.yearMax));
      const meetsMileage =
        (!filters.mileageMin || car.mileage >= Number(filters.mileageMin)) &&
        (!filters.mileageMax || car.mileage <= Number(filters.mileageMax));
      const meetsFuel = !filters.fuel || car.fuel === filters.fuel;
      const meetsColor = !filters.color || car.color === filters.color;
      /*
      const meetsHorsepower =
        (!filters.horsepowerMin || car.horsepower >= Number(filters.horsepowerMin)) &&
        (!filters.horsepowerMax || car.horsepower <= Number(filters.horsepowerMax));
  */
      return (
        meetsPrice &&
        meetsBrand &&
        meetsYear &&
        meetsMileage &&
        meetsFuel &&
        meetsColor/* &&
        meetsHorsepower*/
      );
    });
    setFilteredCars(filtered);
  };

  // Função para atualizar o slider de preço
  const handlePriceSliderChange = (value) => {
    setFilters({ ...filters, priceMin: value[0], priceMax: value[1] });
    setPriceRange(value);
  };/*
  const handleHorsepowerSliderChange = (value) => {
    setFilters({ ...filters, horsepowerMin: value[0], horsepowerMax: value[1] });
    setHorsepowerRange(value);
  }*/

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
{/*
        <div className="filter-group">
          <label htmlFor="horsepower">Horsepower (CV)</label>
          <Slider
            range
            min={100}
            max={1000}
            step={10}
            value={horsepowerRange}
            onChange={handleHorsepowerSliderChange}
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
        </div> */}

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