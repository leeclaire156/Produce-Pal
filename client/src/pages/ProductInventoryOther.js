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
import { useQuery } from '@apollo/client';
// import { QUERY_SINGLE_PROFILE, GET_ME } from '../utils/queries';
import { STOREFRONT } from '../utils/queries';
import { useParams } from 'react-router-dom';


const ProductInventoryOther = () => {
    const { id } = useParams();
    window.localStorage.setItem("storeObjectId", JSON.stringify(id));
    console.log(id);

    const { loading, error, data } = useQuery(STOREFRONT, {
        variables: { id }
    });
    const storeData = data?.user || {};
    const productArrayDataAvailable = [];
    const productArrayData = data?.user.products || {};
    // returns array of objects
    // returns one of the objects from the array, a product with many 

    const [state, dispatch] = useProductContext();
    const { currentCategory, categories, currentCategoryName, cart, vendorStatus } = state;
    // fetch products data and product categories data locally. and dispatch to STATE. This code needs to be modified to get data from database.
    useEffect(() => {
        async function fetchData() {
            const data = productArrayData.map(productArrayData => productArrayData);
            console.log(data);
            // extract unique category names from the product data
            const uniqueCategories = [...new Set(productArrayData.map(productArrayData => productArrayData.productCategory))];
            // create a new category list with 'ALL' and unique category names
            const categoriesList = ['All', ...uniqueCategories];
            // convert array to an object to use reducer dispatch
            const categoriesListObject = categoriesList.map((item, index) => {
                return { productId: index, name: item };
            });
            console.log(categoriesListObject);
            // console.log(categoriesList);

            if (data) {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: data,
                });
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categoriesListObject
                });
                data.forEach((product) => {
                    idbPromise('products', 'put', product);
                });
            } else if (!loading) {
                idbPromise('products', 'get').then((data) => {
                    dispatch({
                        type: UPDATE_PRODUCTS,
                        products: data,
                    });
                });
            }
        }
        fetchData();
        // it may not like data below because top end of the array is data
    }, [data, loading, dispatch]);


    const handleClick = (productId) => {
        dispatch({
            type: UPDATE_PRODUCTS,
            products: productArrayData,
        });
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: productId,
            currentCategoryName: categories[productId].name
        });
    };

    function filterProducts() {
        if (!currentCategory) {
            filterAvailableProducts();
            return productArrayDataAvailable;
        } else {
            filterAvailableProducts();
            return productArrayDataAvailable.filter(
                (product) => product.productCategory === categories[currentCategory].name
            );
        }
    }

    function filterAvailableProducts() {
        for (let i = 0; i < productArrayData.length; i++) {
            if (productArrayData[i].productAvailability) {
                productArrayDataAvailable.push(productArrayData[i]);
            }
        }
    }
    // console.log(storeData.products[0].productAvailability);
    // console.log(productArrayData);
    console.log(productArrayDataAvailable);
    if (!loading) {
        return (
            <div className="container my-2 product-inventory">
                <div className='row mb-3'>
                </div>
                <div className='row'>
                    <Cart />
                </div>
                <h1 className='mb-3 text-center'>{storeData.vendorName} Products</h1>

                <div className='row mb-3'>
                    <div className="col-lg-12 d-flex justify-content-end">
                        {/* categories filter button/menu */}
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownBtnCategory" data-bs-toggle="dropdown" aria-expanded="false">
                                {currentCategoryName ? currentCategoryName : 'Select a category'}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownBtnCategory">
                                {categories.map((item) => (
                                    <li key={item.productId}>
                                        <a
                                            href='#'
                                            className="dropdown-item"
                                            value={item.productId}
                                            onClick={() => { handleClick(item.productId) }}
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
                                productId={product.productId}
                                productImage={product.productImage}
                                productName={product.productName}
                                productDescription={product.productDescription}
                                productCategory={product.productCategory}
                                // productInventory={product.productInventory}
                                productPrice={product.productPrice}
                                productUnits={product.productUnits}
                                productType={product.productType}
                                productAvailability={product.productAvailability}
                                productAllergens={product.productAllergens}
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
