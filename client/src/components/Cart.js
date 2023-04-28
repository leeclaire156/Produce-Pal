import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import CartItem from '../components/CartItems';
import Auth from '../utils/auth';
import { useProductContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART, CLEAR_CART } from '../utils/actions';
// import './style.css';

// Sample public testing key for stripe
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
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
        <div className="text-end" >
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

                                    <div className="flex-row text-end">
                                        <strong>Total: ${calculateTotal()}</strong>



                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Add items</button>
                                        <button type="button" className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
                                        {Auth.loggedIn() ? (
                                            <form action="/create-checkout-session" method="POST">
                                                <button type="button" className="btn btn-primary" onClick={submitCheckout}>Checkout</button>
                                            </form>
                                        ) : (
                                            <span>(log in to check out)</span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <h3 className='text-start'>
                                    Your cart is empty!
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>


        // <div className="cart">
        //     <div className="close" onClick={toggleCart}>
        //         [close]
        //     </div>
        //     <h2>Shopping Cart</h2>
        //     {state.cart.length ? (
        //         <div>
        //             {state.cart.map((item) => (
        //                 <CartItem key={item._id} item={item} id={item._id} />
        //             ))}

        //             <div className="flex-row space-between">
        //                 <strong>Total: ${calculateTotal()}</strong>

        //                 {/* {Auth.loggedIn() ? (
        //                     <button onClick={submitCheckout}>Checkout</button>
        //                 ) : (
        //                     <span>(log in to check out)</span>
        //                 )} */}
        //             </div>
        //         </div>
        //     ) : (
        //         <h3>
        //             <span role="img" aria-label="shocked">
        //                 😱
        //             </span>
        //             Your cart is empty!
        //         </h3>
        //     )}
        // </div>


    );
};

export default Cart;




// const Cart = () => {
//     const [cartState] = useContext(CartContext);
//     const [cartVisible, setCartVisible] = useState(false);

//     const handleToggleCart = () => {
//         setCartVisible(!cartVisible);
//     };

//     console.log(cartState);

//     return (
//         <div className="cart">
//             <button className="btn btn-primary" onClick={handleToggleCart}>
//                 <i className="bi bi-cart"></i> Cart ({cartState.items.length})
//             </button>
//             {cartVisible && (
//                 <div>
//                     {cartState.items.length > 0 ? (
//                         <div>
//                             {cartState.items.map(item => (
//                                 <CartItem key={item._id} item={item} />
//                             ))}
//                             <div className="d-flex justify-content-between">
//                                 <strong>Total:</strong>
//                                 <p>${cartState.total.toFixed(2)}</p>
//                             </div>
//                         </div>
//                     ) : (
//                         <p>Your cart is empty.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;
