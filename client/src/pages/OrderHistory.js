import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/client';
// import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../utils/helpers';
// import CartItem from '../components/CartItems';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom'
import { useProductContext } from '../utils/GlobalState';
import { TOGGLE_VENDOR_STATUS, UPDATE_VENDOR_STATUS } from '../utils/actions';
import UserToggle from '../components/UserToggle';
// import "./order.css";
import ConsumerOrder from '../components/orderhistory/consumerOrder';
import VendorOrder from '../components/orderhistory/vendorOrder';
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROFILE, GET_ME } from '../utils/queries'

const OrderHistory = () => {
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filteredOrdersByVendor, setFilteredOrdersByVendor] = useState([]);

    const { profileId } = useParams();
    //if params that pass in userID exist, use QUERY_SINGLE_PROFILE, if not, use GET_ME query
    const { loading, error, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : GET_ME,
        {
            variables: { profileId: profileId },
        },
    );

    console.log(data);
    const profile = data?.me || data?.profile || {};

    const userOrder = profile.orders
    const userSales = profile.sales

    const [state, dispatch] = useProductContext();
    // remember to bring in additional global states.
    const { vendorStatus } = state;

    // checks if orders match profile of buyer
    useEffect(() => {
        if (userOrder) {
            const filtered = userOrder.filter(order => order.buyerName[0]?._id === profile._id);
            setFilteredOrders(filtered);
        }
    }, [userOrder, profile]);

    // checks if sales match profile of vendor
    useEffect(() => {
        if (userSales) {
            const filtered = userSales.filter(order => order.sellerName[0]?._id === profile._id);
            setFilteredOrdersByVendor(filtered);
        }
    }, [userSales, profile]);

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



    if (Auth.loggedIn()) {
        if (loading) {
            return (
                <h2 className="container d-flex justify-content-center align-items-center">
                    loading...
                </h2>);
        }
        if (error) {
            return (<p>Error: {error.message}</p>);
        }

        return (
            <div className="container order-history">
                <p>yes</p>
                <div className='row mb-3'>
                    <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} />
                </div>
                {vendorStatus
                    ?
                    <div>
                        <h1 className="text-center mb-5">Sales History</h1>
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
                                <ConsumerOrder key={order._id} {...order}
                                    orderId={order.orderId}
                                    sellerName={order.sellerName[0]?.vendorName}
                                    purchaseDate={order.purchaseDate}
                                    productName={order.products[0].productName}
                                    productUnits={order.products[0].productUnits}
                                    products={order.products}
                                    orderType={order.orderType}
                                    sellerImg={order.sellerName[0]?.vendorImage}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
        );
    } else {
        return (
            <Redirect to={{ pathname: '/login' }}></Redirect>)
    };

}

export default OrderHistory; 