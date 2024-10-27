import React, { createContext, useState } from 'react';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
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
  const [filteredCars, setFilteredCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [colors, setColors] = useState([]);
  const [fuels, setFuels] = useState([]);

  return (
    <FiltersContext.Provider value={{
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
    }}>
      {children}
    </FiltersContext.Provider>
  );
};