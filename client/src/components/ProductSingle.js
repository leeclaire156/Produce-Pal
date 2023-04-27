import React from "react";
// import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useProductContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";


function ProductSingle(item) {
    const [state, dispatch] = useProductContext();

    const {
        // image,
        _id,
        productName,
        productDescription,
        productCategory,
        productInventory,
        productPrice,
        productUnits,
        productType,
        productAvailability,
    } = item;

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

    return (
        <div key={_id} className="col-md-4 mb-4">
            <div className="card">
                <img src="https://placehold.co/600x300" className="card-img-top" alt="placeholder" />
                <div className="card-body">
                    <h5 className="card-title">{productName}</h5>
                    <p className="card-text">{productDescription}</p>
                    <p className="card-text"><small>Category: {productCategory}</small></p>
                    <p className="card-text"><small>Inventory: {productInventory}</small></p>
                    <p className="card-text"><small>Price: ${productPrice} /{productUnits}</small></p>
                    <p className="card-text"><small>Type: {productType ? 'Weekly Farm Produce Box' : 'Produce'}</small></p>
                    <p className="card-text"><small>Availability: {productAvailability ? 'in-stock' : 'out-stock'}</small></p>
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
                                <select className="form-select" aria-label="select-type" id={`product-type-input-${_id}`}>
                                    <option value='true'>weekly box</option>
                                    <option value='false'>produce</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Availability</label>
                                <select className="form-select" aria-label="select-availability" id={`product-availability-input-${_id}`}>
                                    <option value='true'>In-stock</option>
                                    <option value='false'>Out-stock</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" id={`product-description-input-${_id}`} rows="3" placeholder={productDescription}></textarea>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>

    );
}

export default ProductSingle;

