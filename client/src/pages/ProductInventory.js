import React, { useContext, useEffect, useState } from 'react';
import { useProductContext } from '../utils/GlobalState';
import {
    UPDATE_PRODUCTS, UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY, TOGGLE_VENDOR_STATUS
} from '../utils/actions';
// productData needs to be hidden when merging
import productData from '../utils/products';
import ProductSingle from '../components/ProductSingle';
import Cart from '../components/Cart';
import { idbPromise } from '../utils/helpers';
import UserToggle from '../components/UserToggle';


const ProductInventory = () => {

    const [state, dispatch] = useProductContext();
    // remember to bring in additional global states.
    const { currentCategory, categories, currentCategoryName, cart, vendorStatus } = state;

    // fetch products data and product categories data locally. and dispatch to STATE. This code needs to be modified to get data from database.
    useEffect(() => {
        async function fetchData() {
            const data = productData.map(productData => productData);
            // extract unique category names from the product data
            const uniqueCategories = [...new Set(productData.map(productData => productData.productCategory))];
            // create a new category list with 'ALL' and unique category names
            const categoriesList = ['All', ...uniqueCategories];
            // convert array to an object to use reducer dispatch
            const categogiesListObject = categoriesList.map((item, index) => {
                return { _id: index, name: item };
            });
            console.log(categogiesListObject);
            // console.log(categoriesList);

            dispatch({ type: UPDATE_PRODUCTS, products: data });
            dispatch({ type: UPDATE_CATEGORIES, categories: categogiesListObject });
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

    const toggleVendorStatus = () => {
        dispatch({ type: TOGGLE_VENDOR_STATUS });
    };

    console.log(vendorStatus);

    return (

        <div className="container my-2">
            {/* This is a reuseable component for managing my own farm inventory and shopping from the other farms. if I am on my product inventory page as a vendor, I will see "my farm products". but if I am a consumer want to do shopping, I will see other farm's name as the title. */}
            <div className='row mb-3'>
                <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} />
            </div>
            <div className='row'>
                {vendorStatus ? <br /> : <Cart />}
            </div>
            {vendorStatus ? <h2 className='fs-2 mb-3 text-center'>My Farm Products</h2> : <h2 className='fs-2 mb-3 text-center'>Co-op Farm Products</h2>}

            <div className='row mb-3'>
                <div className="col-lg-12 d-flex justify-content-center justify-content-lg-between">

                    {/* if I am on my product inventory page as a vendor, I can create a product with this button. */}
                    {vendorStatus ?
                        <div>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createProductModal">Create a product</button>
                        </div>
                        :
                        <div>
                            <button type="button" className="btn btn-primary invisible">Create a product</button>
                        </div>}

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
            {state.products.length ? (
                <div className="row is-flex">
                    {filterProducts().map((product) => (
                        <ProductSingle
                            key={product._id}
                            _id={product._id}
                            // image={product.image}
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


            {/* <!-- "create a product" Modal (enable in vendorStatus: true )--> */}
            <div className="modal modal-lg fade" id="createProductModal" tabIndex="-1" aria-labelledby='createProductModalLabel' aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id='createProductModalLabel'>Create a product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Product name</label>
                                <input type="text" className="form-control text-muted" id='create-product-name' defaultValue='Enter a product name' />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input type="text" className="form-control text-muted" id='create-product-category' defaultValue='Enter a product category' />
                            </div>
                            <div className="form-group">
                                <label>Inventory</label>
                                <input type="number" className="form-control text-muted" id='create-product-inventory' defaultValue='0' />
                            </div>
                            <div className="form-group">
                                <label>Unit Price (USD)</label>
                                <input type="number" className="form-control text-muted" id='create-product-price' defaultValue='0' />
                            </div>
                            <div className="form-group">
                                <label>Units</label>
                                <input type="text" className="form-control text-muted" id='create-product-units' defaultValue='Enter product units' />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select className="form-select" aria-label="select-type" id='create-product-type'>
                                    <option value='true'>weekly box</option>
                                    <option value='false'>produce</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Availability</label>
                                <select className="form-select" aria-label="select-availability" id='create-product-availability'>
                                    <option value='true'>In-stock</option>
                                    <option value='false'>Out-stock</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" id='create-product-description' rows="3" placeholder='Describe your product...'></textarea>
                            </div>
                        </div>
                        {vendorStatus ?
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                            : <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Add items</button>
                                <button type="button" className="btn btn-primary">Checkout</button>
                            </div>
                        }
                    </div>
                </div>
            </div>






        </div>
        // console.log(state)

    );
};

export default ProductInventory;
