import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/client';
// import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../utils/helpers';
// import CartItem from '../components/CartItems';
// import Auth from '../../utils/auth';
import { useProductContext } from '../utils/GlobalState';
import { TOGGLE_VENDOR_STATUS, UPDATE_VENDOR_STATUS } from '../utils/actions';
// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
import UserToggle from '../components/UserToggle';
import orders from '../utils/OrdersData';
// import "./order.css";
import ConsumerOrder from '../components/orderhistory/consumerOrder';
import VendorOrder from '../components/orderhistory/vendorOrder';


const OrderHistory = () => {
    // test currentUser id
    const currentUser = {
        _id: 3,
    };

    const [userOrders, setUserOrders] = useState([]);
    const [state, dispatch] = useProductContext();
    // remember to bring in additional global states.
    const { currentCategory, categories, currentCategoryName, cart, vendorStatus } = state;

    // filter to find the current user's order from the all orders data
    const filteredOrders = orders.filter(
        (order) =>
            (order.buyerName._id === currentUser._id)
    );
    // filter orders by vendor id
    const filteredOrdersByVendor = orders.filter(
        (order) =>
            (order.sellerName._id === currentUser._id)
    );

    // console.log(orders);
    console.log(filteredOrders);
    console.log(filteredOrdersByVendor);
    // console.log(currentUser);
    // console.log(state);

    // function to set the current user's orders as a local STATE 'userOrders'
    const handleUserOrders = () => {
        setUserOrders(filteredOrders);
    };

    // load current vendorStatus from IndexDB if there is one
    const loadVendorStatus = async () => {
        const vendorStatusIDB = await idbPromise('vendorStatus', 'get');
        // console.log(vendorStatusIDB[0].vendorStatus);
        if (vendorStatusIDB[0].vendorStatus === true || vendorStatusIDB[0].vendorStatus === false) {
            dispatch({ type: UPDATE_VENDOR_STATUS, vendorStatus: vendorStatusIDB[0].vendorStatus });
        } else {
            const vendorStatusObj = { _id: 1, vendorStatus: vendorStatus };
            idbPromise('vendorStatus', 'put', vendorStatusObj);
        };
        return;
    }
    // only allow loadVendorStatus() function to run once when the page loading.
    window.addEventListener('load', async function onLoad() {
        loadVendorStatus();
        window.removeEventListener('load', onLoad);
    });

    console.log("global VendorStatus =" + vendorStatus);
    // toggleVendorStatus function to update the vendorStatus in globalState and IndexDB.
    const toggleVendorStatus = async () => {
        try {
            // console.log(vendorStatus);
            await dispatch({ type: TOGGLE_VENDOR_STATUS })
            const vendorStatusObj = { _id: 1, vendorStatus: !vendorStatus };
            await idbPromise('vendorStatus', 'put', vendorStatusObj);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    console.log("global VendorStatus =" + vendorStatus);


    return (
        <div className="container order-history">

            <div className='row mb-3'>
                <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} />
            </div>

            {vendorStatus
                ?
                <div>
                    <h1 className="text-center mb-5">Manage Consumer Orders</h1>
                    <div>
                        {filteredOrdersByVendor.map((order) => (
                            <VendorOrder key={order._id} {...order} />
                        ))}
                    </div>
                </div>
                : <div>
                    <h1 className="text-center mb-5">My Orders</h1>
                    <div>
                        {filteredOrders.map((order) => (
                            <ConsumerOrder key={order._id} {...order} />
                        ))}
                    </div>
                </div>
            }


        </div>
    );
}

export default OrderHistory; 