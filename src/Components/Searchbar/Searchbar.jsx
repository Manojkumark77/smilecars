import React from 'react';
import "./searchbar.css"


const SearchBar = () => {
  return (
    <section className="search-bar">
      <div className="search-item">
        <label>&#128205; Location</label>
        <input type="text" placeholder="Search your location" />
      </div>
      <div className="search-item">
        <label>&#128197; Pickup Date</label>
        <input type="datetime-local" />
      </div>
      <div className="search-item">
        <label>&#128197; Return Date</label>
        <input type="datetime-local" />
      </div>
      <button className="search-btn">Search</button>
    </section>
  );
};

export default SearchBar;