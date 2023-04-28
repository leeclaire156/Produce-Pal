import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/client';
// import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../utils/helpers';
// import CartItem from '../components/CartItems';
// import Auth from '../../utils/auth';
import { useProductContext } from '../utils/GlobalState';
import { TOGGLE_VENDOR_STATUS, UPDATE_VENDOR_STATUS } from '../utils/actions';
import UserToggle from '../components/UserToggle';
import orders from '../utils/OrdersData';
// import "./order.css";
import ConsumerOrder from '../components/orderhistory/consumerOrder';
import VendorOrder from '../components/orderhistory/vendorOrder';
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROFILE, GET_ME } from '../utils/queries'

const OrderHistory = () => {
    const { profileId } = useParams();
    //if params that pass in userID exist, use QUERY_SINGLE_PROFILE, if not, use GET_ME query
    const { loading, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : GET_ME,
        {
            variables: { profileId: profileId },
        },
    );

    const profile = data?.me || data?.profile || {};
    // console.log(profile)
    // console.log(profile._id)

    // console.log(profile.sales)
    const userOrder = profile.orders
    const userSales = profile.sales
    console.log(userOrder)
    console.log(userOrder)
    console.log(userOrder[0].orderId)

    // console.log(userSales)
    // console.log(userOrder[0].buyerName)
    // console.log(userOrder[0].buyerName[0]?)
    // console.log(userOrder[0].buyerName[0]?._id)
    // // order = stuff user buys, so filteredOrders replaces this
    // //sales = stuff bought from user so filteredOrdersByVendor replaces this

    // test currentUser id
    const currentUser = {
        _id: 3,
    };

    // const [userOrders, setUserOrders] = useState([]);
    const [state, dispatch] = useProductContext();
    // remember to bring in additional global states.
    const { vendorStatus } = state;

    // filter to find the current user's order from the all orders data
    const filteredOrders = userOrder.filter(
        (order) =>
            (order.buyerName[0]?._id === profile._id)
    );
    console.log(filteredOrders)
    // // filter orders by vendor id
    // const filteredOrdersByVendor = userOrder.filter(
    //     (order) =>
    //         (order.sellerName[0]?._id === profile._id)
    // );

    // console.log(orders);
    // console.log(filteredOrders); //fake consumer side orders (things this account has bought)
    // console.log(filteredOrdersByVendor); //fake vendor side orders (things bought from this account's store)
    // console.log(currentUser);
    // console.log(state);

    // // function to set the current user's orders as a local STATE 'userOrders'
    // const handleUserOrders = () => {
    //     setUserOrders(filteredOrders);
    // };

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
                    <h1 className="text-center mb-5">Consumer Orders</h1>
                    <div>
                        {userSales.map((order) => (
                            <VendorOrder key={order._id} {...order} />
                        ))}
                    </div>
                </div>
                : <div>
                    <h1 className="text-center mb-5">My Orders</h1>
                    <div>
                        {/* {filteredOrders.map((order) => (
                            <ConsumerOrder key={order._id} {...order} /> */}
                        {filteredOrders.map((order) => (
                            <ConsumerOrder key={order._id} {...order}
                                orderId={order.orderId}
                                sellerName={order.sellerName[0]?.vendorName}
                                purchaseDate={order.purchaseDate}
                                productName={order.products[0].productName}
                                productUnits={order.products[0].productUnits}
                                products={order.products}
                                orderType={order.orderType}
                            />
                        ))}
                    </div>
                </div>
            }


        </div>
    );
}

export default OrderHistory; 