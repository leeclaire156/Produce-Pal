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


    // const [state, dispatch] = useProductContext();
    // // remember to bring in additional global states.
    // const { currentCategory, categories, currentCategoryName, cart, vendorStatus } = state;

    // fetch products data and product categories data locally. and dispatch to STATE. This code needs to be modified to get data from database.
    // useEffect(() => {
    //     async function fetchData() {
    //         const data = productData.map(productData => productData);
    //         // extract unique category names from the product data
    //         const uniqueCategories = [...new Set(productData.map(productData => productData.productCategory))];
    //         // create a new category list with 'ALL' and unique category names
    //         const categoriesList = ['All', ...uniqueCategories];
    //         // convert array to an object to use reducer dispatch
    //         const categoriesListObject = categoriesList.map((item, index) => {
    //             return { _id: index, name: item };
    //         });
    //         console.log(categoriesListObject);
    //         // console.log(categoriesList);

    //         dispatch({ type: UPDATE_PRODUCTS, products: data });
    //         dispatch({ type: UPDATE_CATEGORIES, categories: categoriesListObject });
    //         data.forEach((product) => {
    //             idbPromise('products', 'put', product);
    //         });

    //     }
    //     fetchData();
    // }, []);


    // const handleClick = (id) => {
    //     dispatch({
    //         type: UPDATE_CURRENT_CATEGORY,
    //         currentCategory: id,
    //         currentCategoryName: categories[id].name
    //     });
    // };

    // function filterProducts() {
    //     if (!currentCategory) {
    //         return state.products;
    //     } else {
    //         return state.products.filter(
    //             // (product) => product.productCategory === currentCategory
    //             (product) => product.productCategory === categories[currentCategory].name
    //         );
    //     }
    // }
    // console.log(categories);
    // console.log(cart.length);

    // const toggleVendorStatus = () => {
    //     dispatch({ type: TOGGLE_VENDOR_STATUS });
    // };

    // console.log(vendorStatus);

    // const { profileId } = useParams();
    // const { data } = useQuery(
    //     profileId ? QUERY_SINGLE_PROFILE : GET_ME,
    //     {
    //         variables: { profileId: profileId },
    //     },
    // );
    // const profile = data?.me || data?.profile || {};

    // const [addProduct] = useMutation(ADD_PRODUCT);
    // const [url, setUrl] = useState("");
    // const [productFormData, setProductFormData] = useState({
    //     productId: '',
    //     productName: '',
    //     productType: '',
    //     productPrice: '',
    //     productCategory: '',
    //     productInventory: '',
    //     productUnits: '',
    //     productAllergens: '',
    //     productAvailability: '',
    //     productDescription: '',
    //     productImage: url,
    //     user: storeData._id,
    // });

    // const [loading, setLoading] = useState(false);


    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

    // function uploadSingleImage(base64) {
    //     setLoading(true);
    //     axios
    //         .post("http://localhost:3000/uploadImage", { image: base64 })
    //         .then((res) => {
    //             setUrl(`${res.data}`);
    //             alert(`Image uploaded Successfully. Url is ${url} or ${res.data}`);
    //         })
    //         .then(() => setLoading(false))
    //         .catch(console.log);
    // }

    // const uploadImage = async (event) => {
    //     const files = event.target.files;
    //     if (files.length === 1) {
    //         const base64 = await convertBase64(files[0]);
    //         uploadSingleImage(base64);
    //         return;
    //     }
    // };

    // const handleInputChange = (event) => {
    //     const { name, type, value } = event.target;
    //     setProductFormData(input => {
    //         const productFormData = { ...input }

    //         switch (type) {
    //             case 'number':
    //                 productFormData[name] = Number(value);
    //                 break;
    //             case 'radio':
    //                 if (value == "true") { productFormData[name] = true } else { productFormData[name] = false }
    //                 break;
    //             default:
    //                 productFormData[name] = value;
    //         }
    //         return productFormData;
    //     });
    // };

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(productFormData)
    //     try {
    //         //adds product to database based on input form information stored in productFormData variable
    //         const { data } = addProduct({
    //             variables: {
    //                 productId: productFormData.productId,
    //                 productName: productFormData.productName,
    //                 productType: productFormData.productType,
    //                 productPrice: productFormData.productPrice,
    //                 productCategory: productFormData.productCategory,
    //                 productInventory: productFormData.productInventory,
    //                 productUnits: productFormData.productUnits,
    //                 productAllergens: productFormData.productAllergens,
    //                 productAvailability: productFormData.productAvailability,
    //                 productDescription: productFormData.productDescription,
    //                 productImage: url,
    //                 user: storeData._id
    //             },
    //         });
    //         return data;
    //     } catch (err) {
    //         console.error(err);
    //         console.log(productFormData)
    //     }

    //     // setProductFormData({
    //     //     productId: '',
    //     //     productName: '',
    //     //     productType: '',
    //     //     productPrice: '',
    //     //     productCategory: '',
    //     //     productInventory: '',
    //     //     productUnits: '',
    //     //     productAllergens: '',
    //     //     productAvailability: '',
    //     //     productDescription: '',
    //     //     productImage: '',
    //     // });
    // };


    // return (

    //     <div className="container my-2">
    //         {/* This is a reuseable component for managing my own farm inventory and shopping from the other farms. if I am on my product inventory page as a vendor, I will see "my farm products". but if I am a consumer want to do shopping, I will see other farm's name as the title. */}
    //         <div className='row mb-3'>
    //             {/* TEMPORARY FOR TESTING, NEED TO DELETE LATER */}
    //             {/* <UserToggle vendorStatus={vendorStatus} onToggle={toggleVendorStatus} /> */}
    //         </div>
    //         <div className='row'>
    //             <Cart />
    //         </div>
    //         <h2 className='fs-2 mb-3 text-center'>Co-op Farm Products</h2>

    //         <div className='row mb-3'>
    //             <div className="col-lg-12 d-flex justify-content-center justify-content-lg-between">

    //                 {/* invisible as a placeholder. */}
    //                 <div>
    //                     <button type="button" className="btn btn-primary invisible">Create a product</button>
    //                 </div>

    //                 {/* categories filter button/menu - DELETED */}

    //             </div>
    //         </div>
    //         {/* array of product cards */}
    //         {storeData.products.length ? (
    //             <div className="row is-flex">
    //                 {filterProducts().map((product) => (
    //                     <ProductSingleOther
    //                         key={product._id}
    //                         _id={product._id}
    //                         // image={product.image}
    //                         productName={product.productName}
    //                         productDescription={product.productDescription}
    //                         productCategory={product.productCategory}
    //                         productInventory={product.productInventory}
    //                         productPrice={product.productPrice}
    //                         productUnits={product.productUnits}
    //                         productType={product.productType}
    //                         productAvailability={product.productAvailability}
    //                     />
    //                 ))}
    //             </div>
    //         ) : (
    //             <h3>No products in this farm yet !</h3>
    //         )}
            
    //     </div>
    //     // console.log(state)

    // );
};

export default ProductInventoryOther;
