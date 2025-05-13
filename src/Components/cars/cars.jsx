import React, { useEffect, useState } from 'react';
import './cars.css';
import carData from '../../data/cars.json';

const Fleet = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');

  useEffect(() => {
    setCars(carData);
    setFilteredCars(carData);
  }, []);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);

    let updatedCars;
    if (brand === 'All') {
      updatedCars = cars;
    } else {
      updatedCars = cars.filter((car) => car.brand === brand);
    }

  setFilteredCars(updatedCars);
};


  const brands = ['All', ...new Set(cars.map((car) => car.brand))];

  return (
    <div className="fleet-container">
      <h2>Pick Your Wheel</h2>

      <div className="filter-container">
        <label>Filter by Brand:</label>
        <select id="brand-filter" value={selectedBrand} onChange={handleBrandChange}>
          {brands.map((brand, i) => (
            <option key={i} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="fleet-cards">
        {filteredCars.map((car, i) => (
          <div className="fleet-card" key={i}>
            <img src={car.image} alt={car.model} className="car-image" />
            <h3>{car.model}</h3>
            <p>{car.brand}</p>
            <p className="car-info">
              &#9889; {car.fuel} &nbsp;
              &#128101;{car.seater} Seater &nbsp;
              &#9881; {car.transmission}
            </p>
            <p className="car-price">&#8377; {car.pricePerDay} / day</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
