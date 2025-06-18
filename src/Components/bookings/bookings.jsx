import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ErrorMsgs } from "./constants";
import car from "../../Images/car.png";
import "./bookings.css";

const BookingForm = () => {
  const location = useLocation();
  const { carName = "", brand = "" } = location.state || {};

  const [bookingData, setBookingData] = useState({
    name: "",
    contact: "",
    email: "",
    license: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    carName,
    brand,
  });

  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = () => {
    const FormFieldError = {};

    if (focus.name && !ErrorMsgs.name.regex.test(bookingData.name)) {
      FormFieldError.name = ErrorMsgs.name.message;
    }

    if (focus.contact && !ErrorMsgs.contact.regex.test(bookingData.contact)) {
      FormFieldError.contact = ErrorMsgs.contact.message;
    }

    if (focus.email && !ErrorMsgs.email.regex.test(bookingData.email)) {
      FormFieldError.email = ErrorMsgs.email.message;
    }

    if (focus.license && !ErrorMsgs.contact.regex.test(bookingData.license)) {
      FormFieldError.license = ErrorMsgs.license.message;
    }

    if (
      focus.returnDate &&
      bookingData.pickupDate &&
      bookingData.returnDate &&
      new Date(bookingData.returnDate) <= new Date(bookingData.pickupDate)
    ) {
      FormFieldError.returnDate = "Return date must be after pickup date";
    }

    setErrors(FormFieldError);

    const isValid =
      Object.keys(FormFieldError).length === 0 &&
      bookingData.name &&
      bookingData.contact &&
      bookingData.email &&
      bookingData.license &&
      bookingData.pickupDate &&
      bookingData.pickupTime &&
      bookingData.returnDate &&
      bookingData.returnTime;

    setIsFormValid(isValid);
  };

  useEffect(() => {
    validate();
  }, [bookingData, focus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFocus((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill all fields correctly before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/bookings", bookingData);
      alert("Booking submitted successfully!");

      setBookingData({
        name: "",
        contact: "",
        email: "",
        license: "",
        pickupDate: "",
        pickupTime: "",
        returnDate: "",
        returnTime: "",
        carName: "",
        brand: "",
      });
      setFocus({});
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking");
    }
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        <div className="form-section">
          <h2>Rental Booking</h2>
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={bookingData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {focus.name && errors.name && (
              <p className="error">{errors.name}</p>
            )}

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={bookingData.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {focus.contact && errors.contact && (
              <p className="error">{errors.contact}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={bookingData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {focus.email && errors.email && (
              <p className="error">{errors.email}</p>
            )}

            <input
              type="text"
              name="license"
              placeholder="License Number"
              value={bookingData.license}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {focus.license && errors.license && (
              <p className="error">{errors.license}</p>
            )}

            <div className="car-details-row">
              <div className="input-group">
                <label htmlFor="carName">Car Name</label>
                <input
                  type="text"
                  id="carName"
                  name="carName"
                  placeholder="Car Name"
                  value={bookingData.carName}
                  readOnly
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="Brand"
                  value={bookingData.brand}
                  readOnly
                  required
                />
              </div>
            </div>

            <div className="datetime-row">
              <div>
                <label htmlFor="pickdate">Pickup Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  id="pickdate"
                  value={bookingData.pickupDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div>
                <label htmlFor="picktime">Time</label>
                <input
                  type="time"
                  name="pickupTime"
                  id="picktime"
                  value={bookingData.pickupTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>
            <div className="datetime-row">
              <div>
                <label htmlFor="returndate">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  id="returndate"
                  value={bookingData.returnDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {focus.returnDate && errors.returnDate && (
                  <p className="error">{errors.returnDate}</p>
                )}
              </div>
              <div>
                <label htmlFor="returntime">Time</label>
                <input
                  type="time"
                  name="returnTime"
                  id="returntime"
                  value={bookingData.returnTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={!isFormValid}>
              BOOK NOW
            </button>
          </form>
        </div>

        <img src={car} alt="Cab" className="centered-car" />
        <div className="image-section"></div>
      </div>
    </div>
  );
};

export default BookingForm;
