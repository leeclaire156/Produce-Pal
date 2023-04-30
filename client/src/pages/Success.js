import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    // // params for the addOrder function that gets called here
    // let seller = window.localStorage.getItem("storeObjectId");

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const sellerName = JSON.parse(localStorage.getItem("storeObjectId"));
            // const products = cart.map((item) => item._id); //same as cart
            var products = [];
            var quantity = [];
            for (var i = 0; i < cart.length; i++) {
                products.push(cart[i]._id)
                quantity.push(cart[i].purchaseQuantity)
            }
            if (cart.length) {
                const { data } = await addOrder({ variables: { products, quantity, sellerName } });
                const productData = data.addOrder.products;
                const sellerData = data.addOrder.sellerName;
                console.log(data)
                console.log(productData)
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

    return (
        <div>

            <Jumbotron>
                <h1>Success!</h1>
                <h2>Thank you for your purchase!</h2>
                <h2>You will now be redirected to the home page</h2>
            </Jumbotron>
        </div>
    );
}

export default Success;
