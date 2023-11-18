import React, { useState } from 'react';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import SearchBar from '../react-search-bar/src/components/SearchBar';
import SearchResultsList from '../react-search-bar/src/components/SearchResultsList';

const HomePage = () => {
  // Define a state and its updater function (setSearchResults)
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="home-page">
      <NavBar />
      {/* The background image */}
      <div className="background-image"></div>

      {/* Search bar and results positioned at the top of the background image */}
      <div className="search-section">
        <div className="search-bar-css">
            <SearchBar setResults={setSearchResults} />
        </div>
        <div className="search-results-css">
            <SearchResultsList results={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
