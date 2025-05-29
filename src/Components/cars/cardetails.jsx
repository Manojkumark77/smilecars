import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./cardetails.css";

const CarDetails = () => {
  const { model } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2001/cars")
      .then((res) => {
        const foundCar = res.data.find(
          (c) => c.model === decodeURIComponent(model)
        );
        setCar(foundCar);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch car details:", err);
        setError("Failed to load car details");
        setLoading(false);
      });
  }, [model]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <div className="cars-details-page">
      <div className="cars-header">
        <h2>
          Rent {car.brand} {car.model} for Self Drive
        </h2>
      </div>
      <div className="cars-details-container">
        <img src={car.image} alt={car.model} className="cars-image" />
        <div className="cars-info">
          <p>{car.description}</p>
          <div className="cars-specs">
            <div className="spec-item">
              <div className="icon">⛽</div>
              <div>{car.fuel}</div>
            </div>
            <div className="spec-item">
              <div className="icon">⚙️</div>
              <div>{car.transmission}</div>
            </div>
            <div className="spec-item">
              <div className="icon">🚗</div>
              <div>{car.seater} Seater</div>
            </div>
            <div className="spec-item">
              <div className="icon">💰</div>
              <div>₹{car.pricePerDay}/day</div>
            </div>
          </div>
          <div className="group-buttons">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/cars")}
            >
              Back to Fleet
            </button>
            <button
              type="button"
              className="book-btn"
              onClick={() =>
                navigate("/bookings", {
                  state: {
                    carName: car.model,
                    brand: car.brand,
                  },
                })
              }
            >
              Book my car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
