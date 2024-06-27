import React, { useState, useEffect, useCallback } from "react";

const SearchProduct = ({ products, onSearch }) => {
    const [searchInput, setSearchInput] = useState(''); // State to keep track of the search input value
    const [query, setQuery] = useState('');

    const handleSearch = useCallback(() => {
        const filtered = products.filter(room =>
            room.name.toLowerCase().includes(query.toLowerCase())
        );
        onSearch(filtered);
    }, [products, query, onSearch]);

    useEffect(() => {
        handleSearch();
    }, [query]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchInput(value); // Update the search input value
        setQuery(value); // Update the query only when the user types
    };

    return (
        <div className="container-fluid mb-1">
            <div className="row">
                <div className="col-md-6 form-group">
                   <input className="form-control" type="text" placeholder="Search Products" value={searchInput} onChange={handleInputChange} />
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;
