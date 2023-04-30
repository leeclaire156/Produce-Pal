import React from 'react';
import { useProductContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

const CartItem = ({ item }) => {

    const [state, dispatch] = useProductContext();

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });

    };

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
            idbPromise('cart', 'delete', { ...item });

        } else {
            if (!value) {
                dispatch({
                    type: UPDATE_CART_QUANTITY,
                    _id: item._id,
                    purchaseQuantity: parseInt(0)
                });
                idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(0) });
            } else {
                dispatch({
                    type: UPDATE_CART_QUANTITY,
                    _id: item._id,
                    purchaseQuantity: parseInt(value)
                });
                idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
            };

        }
    }

    // console.log(state);

    return (
        <div className="container" >
            <div className="row align-items-center mb-3">
                
                <div className="col-md-3">
                    <div className='d-flex flex-column align-items-center'>
                        <img
                            src={item.productImage ? item.productImage : 'https://placehold.co/150x150'}
                            alt=""
                            className="img-fluid"
                        />
                    </div>
                </div>

                <div className="col-md-6 cart-product-list">
                    <div className='d-flex flex-column align-items-start text-start'>
                        <div className='cart-product-name mb-2'>{item.productName}</div>
                        <div className='cart-product-description mb-2'>{item.productDescription}</div>
                        <div>
                            <span>Qty:</span>
                            <input
                                className='ms-2'
                                type="number"
                                placeholder=""
                                defaultValue={item.purchaseQuantity}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                </div>

                <div className="col-md-3 cart-price">
                    <div className='d-flex flex-column align-items-start'>
                        <h4>${item.productPrice}/{item.productUnits}</h4>
                        <h4>Subtotal: ${(item.productPrice * item.purchaseQuantity).toFixed(2)}</h4>
                        <button
                            type="button"
                            className='btn btn-danger btn-sm mt-3'
                            onClick={() => removeFromCart(item)}
                        >
                            Delete
                        </button>
                    </div>
                </div>

            </div>


        </div >
    );
}

export default CartItem;





//     return (
//         <div className="d-flex align-items-center justify-content-between my-3">
//             <div>
//                 <h5>{item.productName}</h5>
//                 <div className="input-group  input-group-sm mb-3">
//                     <button className="btn btn-outline-secondary" type="button" onClick={handleMinus}>-</button>
//                     <input type="number" className="form-control" placeholder={item.quantity} />
//                     <button className="btn btn-outline-secondary" type="button" onClick={handlePlus}>+</button>
//                 </div>
//                 <p className="text-muted">${(item.price * item.quantity).toFixed(2)}</p>
//             </div>
//             <div>
//                 <button className="btn btn-danger" type="button" onClick={handleRemove}>
//                     Remove
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CartItem;

