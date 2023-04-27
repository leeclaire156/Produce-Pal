import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    // params for the addOrder function that gets called here
    let seller = window.localStorage.getItem("storeObjectId");

    console.log(JSON.parse(seller))

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const products = cart.map((item) => item._id);

            if (products.length) {
                const { data } = await addOrder({ variables: { products } });
                const productData = data.addOrder.products;

                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }

            setTimeout(() => {
                window.location.assign('/');
                localStorage.clear();
            }, 20000);
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

// TO DO: Clear local storage when it redirects in case a user wants to buy from multiple stores