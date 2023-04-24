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
                            src='https://placehold.co/150x150'
                            alt=""
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className='d-flex flex-column align-items-start'>
                        <div className='fs-4'>{item.productName}</div>
                        <div className='mb-3'>{item.productDescription}</div>
                        <div>
                            <span>Qty:</span>
                            <input
                                className='ms-2'
                                type="number"
                                placeholder=""
                                value={item.purchaseQuantity}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                </div>

                <div className="col-md-3">
                    <div className='d-flex flex-column align-items-start'>
                        <div>${item.productPrice}/{item.productUnits}</div>
                        <div>Subtotal: ${(item.productPrice * item.purchaseQuantity).toFixed(2)}</div>
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

