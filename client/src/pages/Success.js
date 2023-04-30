import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useProductContext } from '../utils/GlobalState';
import { UPDATE_VENDOR_STATUS } from '../utils/actions';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);
    const [state, dispatch] = useProductContext();
    const { vendorStatus } = state;

    // // params for the addOrder function that gets called here
    // let seller = window.localStorage.getItem("storeObjectId");

    var orderId
    function generateOrderId() {
        const dateLong = new Date() // gets todays dated as a super long string
        const dateShort = dateLong.toLocaleDateString('en-US', 'yyyyMMdd') //gets todays date as mm/dd/yyyy
        const dateMMDDYYY = dateShort.split('/') //divides date into components
        const dateNumbs = dateMMDDYYY.join('') //gets date as string of numbers

        const random = Math.random() // picks number between 0 and 1
        const bigRandom = random * 10000 // note that 10,000 orders max can be made per day on the site
        const roundRandom = Math.round(bigRandom) //rounds down or up
        const stringRandom = roundRandom.toString()
        var combo = dateNumbs + stringRandom
        var comboLength = combo.length

        if (comboLength === 11) {
            orderId = combo + '0'
        } else if (comboLength === 10) {
            orderId = combo + '00'
        } else if (comboLength === 9) {
            orderId = combo + '000'
        } else if (comboLength === 8) {
            orderId = combo + '0000'
        } else if (comboLength === 7) {
            orderId = combo + '00000'
        } else {
            orderId = combo
        }

        return orderId
    }


    useEffect(() => {
        async function saveOrder() {
            generateOrderId()

            const cart = await idbPromise('cart', 'get');
            const sellerName = JSON.parse(localStorage.getItem("storeObjectId"));

            var products = [];
            var quantity = [];
            for (var i = 0; i < cart.length; i++) {
                products.push(cart[i]._id)
                quantity.push(cart[i].purchaseQuantity)
            }

            if (cart.length) {
                const { data } = await addOrder({ variables: { orderId, products, quantity, sellerName } });
                const productData = data.addOrder.products;
                const sellerData = data.addOrder.sellerName;

                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
                sellerData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }

            setTimeout(() => {
                resetVendorStatus();
                window.location.assign('/order-history');
                localStorage.removeItem("storeObjectId")
                console.log("Delayed by example 1000 = 1 second")
            }, 3000);
        }

        saveOrder();
    }, [addOrder]);


    // resetVendorStatus function to update the vendorStatus to false (as a buyer) in globalState and IndexDB.
    const resetVendorStatus = async () => {
        try {
            await dispatch({ type: UPDATE_VENDOR_STATUS, vendorStatus: false })
            const vendorStatusObj = { _id: 1, vendorStatus: false };
            await idbPromise('vendorStatus', 'put', vendorStatusObj);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    if (Auth.loggedIn()) {
        return (
            <div className='d-flex justify-content-center align-items-center mt-3 text-center success-page'>

                <Jumbotron >
                    <h1>Success!</h1>
                    <h2>Thank you for your purchase!</h2>
                    <h2>You will now be redirected to the home page</h2>
                    <div className='mt-5'>
                        <h2 className='mb-3'>Please find below a link to access my orders, in case the browser fails to redirect automatically</h2>
                        <Link to="/order-history">
                            <button className='btn btn-secondary dashboard-card-btn' onClick={resetVendorStatus}>
                                my orders
                            </button>
                        </Link>
                    </div>
                </Jumbotron>

            </div>
        );
    } else {
        return (
            <Redirect to={{ pathname: '/login' }}></Redirect>)
    };
}

export default Success;
