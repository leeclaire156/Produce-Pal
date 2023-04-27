import React, { useContext, useEffect, useState } from 'react';
import { useProductContext } from '../utils/GlobalState';
import {
    UPDATE_PRODUCTS, UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY, TOGGLE_VENDOR_STATUS
} from '../utils/actions';
// productData needs to be hidden when merging
// import productData from '../utils/products';
import ProductSingleOther from '../components/ProductSingleOther';
import Cart from '../components/Cart';
import { idbPromise } from '../utils/helpers';
import UserToggle from '../components/UserToggle';

import axios from "axios";

import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';
// import { QUERY_SINGLE_PROFILE, GET_ME } from '../utils/queries';
import { STOREFRONT } from '../utils/queries';
import { useParams } from 'react-router-dom';

const ProductInventoryOther = () => {
    const { id } = useParams();
    console.log(id);
    
    const { loading, error, data } = useQuery(STOREFRONT, {
        variables: { id }
    });
    
    console.log('Hi');
    const storeData = data?.user || {};
    console.log(storeData)

    return(
        <div>Hi</div>
    )