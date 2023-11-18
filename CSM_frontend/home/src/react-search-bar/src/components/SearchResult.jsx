//import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './SearchResult.css';

export const SearchResult = ({ result }) => {
  const decodedImage = decodeURIComponent(result.image);

  return (
    <div className='search-result'>
      <div className='float-container'>
        <div className='float-child-left'>
          <div>
            <p className='large-text'>{result.brand} {result.model}</p>
            <p className='small-text'>Year: {result.year}</p>
          </div>
        </div>
        <div className='float-child-right'>
          <img className='search-result-image' src={decodedImage} alt={`${result.brand} ${result.model}`} />
        </div>
      </div>
    </div>
  );
};

// Prop types validation
SearchResult.propTypes = {
  result: PropTypes.object.isRequired,
};

export default SearchResult;
