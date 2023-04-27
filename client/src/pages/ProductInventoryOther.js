import React, { useContext, useEffect, useState } from 'react';
import { useProductContext } from '../utils/GlobalState';
import {
    UPDATE_PRODUCTS, UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY, TOGGLE_VENDOR_STATUS
} from '../utils/actions';
// productData needs to be hidden when merging
// import productData from '../utils/products';
import ProductSingleOther from '../components/ProductSingleOther';
import Cart from '../components/Cart';
import { idbPromise } from '../utils/helpers';
import UserToggle from '../components/UserToggle';

import axios from "axios";

import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';
// import { QUERY_SINGLE_PROFILE, GET_ME } from '../utils/queries';
import { STOREFRONT } from '../utils/queries';
import { useParams } from 'react-router-dom';

const ProductInventoryOther = () => {
    const { id } = useParams();
    console.log(id);

    const { loading, error, data } = useQuery(STOREFRONT, {
        variables: { id }
    });
    console.log(data)
    const storeData = data?.user || {};
    console.log(storeData)

    const productArrayData = data?.user.products || {};
    // returns array of objects
    console.log(productArrayData)
    // returns one of the objects from the array, a product with many 
    console.log(productArrayData[0])

    const [state, dispatch] = useProductContext();
    const { currentCategory, categories, currentCategoryName, cart, vendorStatus } = state;
    // fetch products data and product categories data locally. and dispatch to STATE. This code needs to be modified to get data from database.
    useEffect(() => {
        async function fetchData() {
            const data = productArrayData.map(productArrayData => productArrayData);
            // extract unique category names from the product data
            const uniqueCategories = [...new Set(productArrayData.map(productArrayData => productArrayData.productCategory))];
            // create a new category list with 'ALL' and unique category names
            const categoriesList = ['All', ...uniqueCategories];
            // convert array to an object to use reducer dispatch
            const categoriesListObject = categoriesList.map((item, index) => {
                return { _id: index, name: item };
            });
            console.log(categoriesListObject);
            // console.log(categoriesList);
            dispatch({ type: UPDATE_PRODUCTS, products: data });
            dispatch({ type: UPDATE_CATEGORIES, categories: categoriesListObject });
            data.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        }
        fetchData();
    }, []);


    const handleClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id,
            currentCategoryName: categories[id].name
        });
    };

    function filterProducts() {
        if (!currentCategory) {
            return state.products;
        } else {
            return state.products.filter(
                // (product) => product.productCategory === currentCategory
                (product) => product.productCategory === categories[currentCategory].name
            );
        }
    }
    // console.log(categories);
    // console.log(cart.length);

    if (!loading) {
        return (
            <div className="container my-2">
                <div className='row mb-3'>
                </div>
                <div className='row'>
                    <Cart />
                </div>
                <h2 className='fs-2 mb-3 text-center'>{storeData.vendorName} Products</h2>

                <div className='row mb-3'>
                    <div className="col-lg-12 d-flex justify-content-center justify-content-lg-between">
                        {/* categories filter button/menu */}
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownBtnCategory" data-bs-toggle="dropdown" aria-expanded="false">
                                {currentCategoryName ? currentCategoryName : 'Select a category'}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownBtnCategory">
                                {categories.map((item) => (
                                    <li key={item._id}>
                                        <a
                                            href='#'
                                            className="dropdown-item"
                                            onClick={() => { handleClick(item._id) }}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* array of product cards */}
                {productArrayData.length ? (
                    <div className="row is-flex">
                        {filterProducts().map((product) => (
                            <ProductSingleOther
                                key={product._id}
                                _id={product._id}
                                image={product.image}
                                productName={product.productName}
                                productDescription={product.productDescription}
                                productCategory={product.productCategory}
                                productInventory={product.productInventory}
                                productPrice={product.productPrice}
                                productUnits={product.productUnits}
                                productType={product.productType}
                                productAvailability={product.productAvailability}
                            />
                        ))}
                    </div>
                ) : (
                    <h3>No products in this farm yet !</h3>
                )}
            </div>
        );
    } else {
        return (
            <h2 className="container d-flex justify-content-center align-items-center">
                loading...
            </h2>
        )
    }
};

export default ProductInventoryOther;
