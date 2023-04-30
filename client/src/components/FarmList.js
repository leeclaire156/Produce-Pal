import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FarmCard from './FarmCard';
import vegImg1 from '../styles/img/veg-1.png';
import vegImg2 from '../styles/img/veg-3.png'

// only shows cards with vendorStatus true
const FarmList = ({ farms }) => {
    console.log(farms)

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [selectedResult, setSelectedResult] = useState([]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setShowResults(value !== '');
        setSearchError('');
        if (value === '') {
            setSearchResults([]);
        } else {
            const filteredResults = farms
                .filter((farm) =>
                    farm.vendorAddress[0]?.city.toLowerCase().includes(value.toLowerCase())
                )
                .slice(0, 6)
                .map((farm) => farm.vendorAddress[0]?.city);
            setSearchResults(filteredResults);
        }
    };

    const handleResultClick = (result) => {
        setSearchTerm(result);
        setShowResults(false);
    };

    const handleSearchSubmit = () => {
        if (searchTerm.trim() === '') {
            setSearchError('Please enter a search term');
            setSearchResults([]);
        } else {
            const filteredFarms = farms.filter((farm) =>
                farm.vendorAddress[0]?.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSelectedResult(filteredFarms);
            setSearchError(filteredFarms.length === 0 ? 'No results found' : '');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center" >
                {/* search bar */}
                <div className="col-10 col-md-6 mb-md-5 mt-md-5 mb-4 mt-4" >
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by city name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleSearchSubmit}
                        >
                            Search
                        </button>
                    </div>
                    {/* drop down list */}
                    {showResults && searchResults.length > 0 && (
                        <div className="bg-light p-2 rounded w-100">
                            {searchResults.map((result) => (
                                <div
                                    className="cursor-pointer"
                                    key={result}
                                    onClick={() => handleResultClick(result)}
                                >
                                    {result}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* farm information cards */}
            <div className="row justify-content-center farm-cards-container">
                <div className="col-2 col-md-1 veg-container">
                    <div className='container veg-container-absolute-left'>
                        <div className='veg-container-relative-left'>
                            <img className='veg-img-left' src={vegImg1} />
                        </div>
                    </div>
                </div>
                <div className="col-8 col-md-9 farm-cards-list">
                    {searchError && (
                        <p className="text-danger">{searchError}</p>
                    )}
                    {/* if the user selected a result from the dropdown list, it will show the farm location that matches the selected Result */}
                    {selectedResult.length > 0 ? (
                        selectedResult.map((farm) => (
                            <FarmCard key={farm._id} farm={farm} />
                        ))
                    ) :
                        (farms.map((farm) => (
                            <FarmCard key={farm._id} farm={farm} />
                        )))}
                </div>
                <div className="col-2 col-md-1 veg-container">
                    <div className='container veg-container-absolute-right'>
                        <div className='veg-container-relative-right'>
                            <img className='veg-img-right' src={vegImg2} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};


export default FarmList;
