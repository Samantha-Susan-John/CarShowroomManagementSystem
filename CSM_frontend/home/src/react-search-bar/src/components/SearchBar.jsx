import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch(`http://localhost:3001/search?q=${value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log('Received data:', json);
        // Check if setResults is a function before calling it
        if (typeof setResults === 'function') {
          setResults(json);
        }
        console.log('Updated state:', json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className='input-wrapper'>
      <FaSearch id="search-icon" />
      <input placeholder='Type to search...' value={input} onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
};

// Make setResults prop optional
SearchBar.propTypes = {
  setResults: PropTypes.func,
};

// Provide a default value for setResults
SearchBar.defaultProps = {
  setResults: () => {},
};

export default SearchBar;
