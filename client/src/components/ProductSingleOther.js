import React from "react";
// import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useProductContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";


function ProductSingleOther(item) {
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
                <img src={productImage ? productImage : "https://placehold.co/600x300"} className="card-img-top" alt="placeholder" />
                <div className="card-body">
                    <h5 className="card-title">{productName}</h5>
                    <p className="card-text">{productDescription}</p>
                    <p className="card-text"><small>Product ID: {productId}</small></p>
                    <p className="card-text"><small>Category: {productCategory}</small></p>
                    <p className="card-text"><small>Inventory: {productInventory}</small></p>
                    <p className="card-text"><small>Price: ${productPrice} /{productUnits}</small></p>
                    <p className="card-text"><small>Type: {productType ? 'Weekly Farm Produce Box' : 'Produce'}</small></p>
                    <p className="card-text"><small>Availability: {productAvailability ? 'in-stock' : 'out-stock'}</small></p>
                    <p className="card-text"><small>Allergens: {productAllergens ? productAllergens : 'none'}</small></p>
                    <div className="input-group input-group-sm mb-3">
                        <button className="btn btn-outline-secondary" type="button" onClick={addToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSingleOther;

