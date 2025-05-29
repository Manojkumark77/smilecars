import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./cars.css";
import { Link } from "react-router-dom";

const Fleet = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const getQueryParam = (key) => {
      const params = new URLSearchParams(location.search);
      return params.get(key);
    };

    axios
      .get("http://localhost:2001/cars")
      .then((res) => {
        setTimeout(() => {
          setCars(res.data);
          setLoading(false);
        }, 2000);
        const allCars = res.data;

        const brandQuery = getQueryParam("brand");
        if (brandQuery) {
          setSelectedBrand(brandQuery);
          setFilteredCars(allCars.filter((car) => car.brand === brandQuery));
        } else {
          setFilteredCars(allCars);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch car data:", error);
        setLoading(false);
      });
  }, [location.search]);

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setFilteredCars(
      brand === "All" ? cars : cars.filter((car) => car.brand === brand)
    );
  };

  const brands = ["All", ...new Set(cars.map((car) => car.brand))];

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <img
          src="https://i.pinimg.com/originals/9e/9c/68/9e9c68435731c23c00573a1544d539b3.gif"
          alt="Loading..."
          height="350px"
          width="550px"
        />
        <p>Loading....</p>
      </div>
    );
  }

  return (
    <div className="fleet-container">
      <h2>Pick Your Wheel</h2>
      <div className="filter-container">
        <label htmlFor="brand-filter">Filter by Brand:</label>
        <select
          id="brand-filter"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          {brands.map((brand, i) => (
            <option key={`${brand}-${i}`} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="fleet-cards">
        {filteredCars.map((car, i) => (
          <div className="fleet-card" key={`${car.model}-${i}`}>
            <img src={car.image} alt={car.model} className="car-image" />
            <h3>{car.model}</h3>
            <p>{car.brand}</p>
            <p className="car-info">
              &#9889; {car.fuel} &nbsp; &#128101; {car.seater} Seater &nbsp;
              &#9881; {car.transmission}
            </p>
            <p className="car-price">&#8377; {car.pricePerDay} / day</p>
            <Link to={`/details/${encodeURIComponent(car.model)}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
