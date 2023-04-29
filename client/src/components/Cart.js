import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import CartItem from '../components/CartItems';
import Auth from '../utils/auth';
import { useProductContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART, CLEAR_CART } from '../utils/actions';
import { Link } from "react-router-dom";
// import './style.css';

// Sample public testing key for stripe

const stripePromise = loadStripe('pk_test_51N1l5jKdLlnWCR5fjBp0MJmhe5XHkJxBwqEGR1zvR6sfqvhsEAPbBfPot4NLRhVLYyz7rYcFDnhdFj2nXDXvs3zV0065QkEhhh');

const Cart = () => {
    // Clears cart on new render
    useEffect(() => {
        clearCart()
    }, []);//Adding empty array runs function in useEffect only on the first render

    const [state, dispatch] = useProductContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);


    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function clearCart() {
        dispatch({ type: CLEAR_CART });
        idbPromise('cart', 'clear');
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.productPrice * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    console.log(state);

    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables: { products: productIds },
        });
    }

    // if (!state.cartOpen) {
    //     return (
    //         <div className="cart-closed" onClick={toggleCart} >
    //             <button className="btn btn-primary" role="img" aria-label="">
    //                 ({state.cart.length}) CART
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <div className="text-end">
            <button className="btn btn-primary" role="img" aria-label="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                ({state.cart.length}) Cart
            </button>

            {/* <!-- Cart Modal --> */}
            <div className="modal modal-lg fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">My cart</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {state.cart.length ? (
                                <div>
                                    {state.cart.map((item) => (
                                        <CartItem key={item._id} item={item} id={item._id} />
                                    ))}

                                    <div className="container" >
                                        <div className="flex-row align-items-center text-end cart-price me-5">
                                            <h3>Total: ${calculateTotal()}</h3>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Add items</button>
                                        <button type="button" className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
                                            <form action="/create-checkout-session" method="POST">
                                                <button type="button" className="btn btn-secondary" onClick={submitCheckout}>Checkout</button>
                                            </form>
                                    </div>
                                </div>
                            ) : (
                                <h3 className='text-center cart-empty mb-5'>
                                    Your cart is empty!
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;




