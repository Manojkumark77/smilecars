import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";
import axios from "axios";

const SearchBar = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/data/cars.json")
      .then((res) => {
        const allBrands = [...new Set(res.data.cars.map((car) => car.brand))];
        setBrands(allBrands);
      })
      .catch((err) => console.error("Error fetching car brands:", err));
  }, []);

  const handleSearch = () => {
    if (!selectedBrand || selectedBrand === "select") {
      alert("Please select a car brand.");
      return;
    }

    if (!pickupDate || !returnDate) {
      alert("Please select both pickup and return dates.");
      return;
    }
    navigate(`/cars?brand=${encodeURIComponent(selectedBrand)}`);
  };

  return (
    <section className="search-bar">
      <div className="search-item">
        <label htmlFor="brand-select">&#128663; Select Car Brand</label>
        <select
          id="brand-select"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="select">Select Car</option>
          {brands.map((brand, i) => (
            <option key={i} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="search-item">
        <label htmlFor="pickup-box">&#128197; Pickup Date</label>
        <input
          type="datetime-local"
          id="pickup-box"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />
      </div>

      <div className="search-item">
        <label htmlFor="return-box">&#128197; Return Date</label>
        <input
          type="datetime-local"
          id="return-box"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      <button type="button" className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </section>
  );
};

export default SearchBar;
