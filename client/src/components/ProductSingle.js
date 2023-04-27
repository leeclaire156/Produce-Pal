import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useProductContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PRODUCT } from '../utils/mutations';
import { QUERY_PRODUCT } from '../utils/queries';
// if above doesnt work use belong and make new query
// import { GET_PRODUCT } from '../utils/queries';

function ProductSingle(item) {
    const [state, dispatch] = useProductContext();

    const {
        productImage,
        _id,
        productId,
        productName,
        productDescription,
        productCategory,
        productInventory,
        productPrice,
        productUnits,
        productType,
        productAvailability,
        productAllergens,
    } = item;

    console.log(item);

    const { cart, vendorStatus } = state

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            });

            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }


    // console.log(cart);
    // console.log(vendorStatus);


    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const [url, setUrl] = useState("");
    const [productFormData, setProductFormData] = useState({
        productId: '',
        productName: '',
        productType: '',
        productPrice: '',
        productCategory: '',
        productInventory: '',
        productUnits: '',
        productAllergens: '',
        productAvailability: '',
        productDescription: '',
        productImage: url,
        // user: profile._id,
    });

    const [loading, setLoading] = useState(false);


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadSingleImage(base64) {
        setLoading(true);
        axios
            .post("http://localhost:3000/uploadImage", { image: base64 })
            .then((res) => {
                setUrl(`${res.data}`);
                alert(`Image uploaded Successfully. Url is ${url} or ${res.data}`);
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
    };

    const handleInputChange = (event) => {
        const { name, type, value } = event.target;
        setProductFormData(input => {
            const productFormData = { ...input }

            switch (type) {
                case 'number':
                    productFormData[name] = Number(value);
                    break;
                case 'radio':
                    if (value == "true") { productFormData[name] = true } else { productFormData[name] = false }
                    break;
                default:
                    productFormData[name] = value;
            }
            return productFormData;
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(productFormData)
        try {
            //adds product to database based on input form information stored in productFormData variable
            const { data } = updateProduct({
                variables: {
                    productId: productFormData.productId,
                    productName: productFormData.productName,
                    productType: productFormData.productType,
                    productPrice: productFormData.productPrice,
                    productCategory: productFormData.productCategory,
                    productInventory: productFormData.productInventory,
                    productUnits: productFormData.productUnits,
                    productAllergens: productFormData.productAllergens,
                    productAvailability: productFormData.productAvailability,
                    productDescription: productFormData.productDescription,
                    productImage: url,
                    // user: profile._id
                },
            });
            return data;
        } catch (err) {
            console.error(err);
            console.log(productFormData)
        }
    }

    return (
        <div key={_id} className="col-md-4 mb-4">
            <div className="card">
                <img src={productImage ? productImage : "https://placehold.co/600x300"} className="card-img-top" alt="placeholder" />
                <div className="card-body">
                    <h5 className="card-title">{productName}</h5>
                    <p className="card-text">{_id}</p>
                    <p className="card-text">{productDescription}</p>
                    <p className="card-text"><small>Category: {productCategory}</small></p>
                    <p className="card-text"><small>Inventory: {productInventory}</small></p>
                    <p className="card-text"><small>Price: ${productPrice} /{productUnits}</small></p>
                    <p className="card-text"><small>Type: {productType ? 'Weekly Farm Produce Box' : 'Produce'}</small></p>
                    <p className="card-text"><small>Availability: {productAvailability ? 'in-stock' : 'out-stock'}</small></p>
                    <p className="card-text"><small>Allergens: {productAllergens ? productAllergens : 'none'}</small></p>
                    <div className="input-group input-group-sm mb-3">

                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target={`#editProductModal-${_id}`}>Edit</button>
                        {/* <button className="btn btn-outline-secondary" type="button" onClick={addToCart}>Add to cart</button> */}
                    </div>
                </div>
            </div>

            {/* <!-- Edit product Modal --> */}
            <div className="modal modal-lg fade" id={`editProductModal-${_id}`} tabIndex="-1" aria-labelledby={`editProductModalLabel-${_id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`editProductModalLabel-${_id}`}>{productName}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Product ID*</label>
                                <input type="number" className="form-control text-muted productId" id={`product-name-input-${_id}`} placeholder={productId} name='productId' onChange={handleInputChange}
                                    value={productFormData.productId} required />
                            </div>
                            <div className="form-group">
                                <label>Product name</label>
                                <input type="text" className="form-control text-muted" id={`product-name-input-${_id}`} defaultValue={productName} />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input type="text" className="form-control text-muted" id={`product-category-input-${_id}`} defaultValue={productCategory} />
                            </div>
                            <div className="form-group">
                                <label>Inventory</label>
                                <input type="number" className="form-control text-muted" id={`product-inventory-input-${_id}`} defaultValue={productInventory} />
                            </div>
                            <div className="form-group">
                                <label>Unit Price (USD)</label>
                                <input type="number" className="form-control text-muted" id={`product-price-input-${_id}`} placeholder={productPrice} />
                            </div>
                            <div className="form-group">
                                <label>Units</label>
                                <input type="text" className="form-control text-muted" id={`product-units-input-${_id}`} defaultValue={`${productUnits}`} />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                {/* <select className="form-select" aria-label="select-type" id={`product-type-input-${_id}`}>
                                    <option value='true'>weekly box</option>
                                    <option value='false'>produce</option>
                                </select> */}
                                <div>
                                    <input type="radio" id='weekly-box' name="productType" onChange={handleInputChange} value="true" />
                                    <label className="ms-1" htmlFor="weekly-box">Weekly box</label>
                                </div>
                                <div>
                                    <input type="radio" id='produce' name="productType" onChange={handleInputChange} value="false" />
                                    <label className="ms-1" htmlFor="weekly-box">Produce</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Availability</label>
                                {/* <select className="form-select" aria-label="select-availability" id={`product-availability-input-${_id}`}>
                                    <option value='true'>In-stock</option>
                                    <option value='false'>Out-stock</option>
                                </select> */}
                                <div>
                                    <input type="radio" id='in-stock' name="productAvailability" onChange={handleInputChange} value="true" />
                                    <label className="ms-1" htmlFor="in-stock">In-stock</label>
                                </div>
                                <div>
                                    <input type="radio" id='out-stock' name="productAvailability" onChange={handleInputChange} value="false" />
                                    <label className="ms-1" htmlFor="out-stock">Out-stock</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" id={`product-description-input-${_id}`} rows={3} placeholder={productDescription} name='productDescription' onChange={handleInputChange}
                                    value={productFormData.productDescription}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Allergen</label>
                                <input type="text" className="form-control text-muted productAllergens" id='create-product-allergens' placeholder={productAllergens} name='productAllergens' onChange={handleInputChange}
                                    value={productFormData.productAllergens} />
                            </div>
                            <div className="form-group mt-3">
                                <label>Image Upload</label>
                                <input type="file"
                                    name='productImage'
                                    onChange={uploadImage}
                                    className='productImage'></input>
                                {url ? <img className="product-img-preview preview-img" src={url} height={100} width={100} /> : <></>}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>

    );
}

export default ProductSingle;

