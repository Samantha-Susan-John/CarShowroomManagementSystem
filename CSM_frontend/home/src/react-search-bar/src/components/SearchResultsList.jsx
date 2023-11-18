// import React from 'react';
import PropTypes from 'prop-types';
import { SearchResult } from './SearchResult';
import './SearchResultsList.css';

export const SearchResultsList = ({ results }) => {
    if (results.length === 0) {
        return <div className='no-result'>No results found</div>;
    }

    return (
        <div className='results-list'>
            {results.map((result, id) => (
                <SearchResult result={result} key={id} />
            ))}
        </div>
    );
};

// Prop types validation
SearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResultsList;
