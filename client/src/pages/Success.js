import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom'

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

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
                window.location.assign('/');
                localStorage.clear();
                console.log("Delayed by example 1000 = 1 second")
            }, 10000000);
        }

        saveOrder();
    }, [addOrder]);

    if (Auth.loggedIn()) {
        return (
            <div>

                <Jumbotron>
                    <h1>Success!</h1>
                    <h2>Thank you for your purchase!</h2>
                    <h2>You will now be redirected to the home page</h2>
                </Jumbotron>
            </div>
        );
    } else {
        return (
            <Redirect to={{ pathname: '/login' }}></Redirect>)
    };
}

export default Success;
