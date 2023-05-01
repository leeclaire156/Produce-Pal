import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useProductContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import Auth from '../utils/auth';


function ProductSingleOther(item) {
    const [state, dispatch] = useProductContext();

    const {
        productImage,
        _id,
        productId,
        productName,
        productDescription,
        productCategory,
        // productInventory,
        productPrice,
        productUnits,
        productType,
        productAvailability,
        productAllergens,
    } = item;

    const { cart, vendorStatus } = state

    const [value, setValue] = useState(1)
    const addToCart = (e) => {
        e.preventDefault()

        setValue(value + 1);

        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...itemInCart, purchaseQuantity: parseInt(value) });
            console.log(state)
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
                <img src={productImage ? productImage : "https://placehold.co/600x300"} className="card-img-top product-card-img" alt="placeholder" />
                <div className="card-body">
                    <h5 className="card-title">{productName}</h5>

                    <div className="product-details mb-3">
                        <h6 className="card-text mb-3">{productDescription}</h6>
                        <p className="card-text"><strong>Product ID: </strong>{productId}</p>
                        <p className="card-text"><strong>Category: </strong>{productCategory}</p>
                        {/* <p className="card-text"><strong>Inventory: </strong>{productInventory}</p> */}
                        <p className="card-text"><strong>Price: </strong>${productPrice} /{productUnits}</p>
                        <p className="card-text"><strong>Type: </strong>{productType ? 'Weekly Farm Produce Box' : 'Produce'}</p>
                        <p className="card-text"><strong>Availability: </strong>{productAvailability ? 'in-stock' : 'out-stock'}</p>
                        <p className="card-text"><strong>Allergens: </strong>{productAllergens ? productAllergens : 'none'}</p>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        {Auth.loggedIn() ? (
                            <button className="btn btn-outline-secondary" type="button" onClick={addToCart}>Add to cart</button>
                        ) : (
                            <Link to="/login">
                                <button className="btn btn-outline-secondary" type="button">Login to add</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductSingleOther;

