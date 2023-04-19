import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';


export default function Upload() {
    // set initial form state
    const [productFormData, setProductFormData] = useState({
        productId: '',
        productName: '',
        // productType: '',
        productPrice: '',
        productCategory: '',
        productInventory: '',
        productUnits: '',
        productAllergens: '',
        // productAvailability: '', //issue: value returns as string and database will not accept because its not boolean. NEED FUNCTION TO CONVERT.
        productDescription: '',
        productImage: '',
    });

    // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_USER mutation
    const [addProduct] = useMutation(ADD_PRODUCT);

    const handleInputChange = (event) => {
        const { name, type, value } = event.target;
        // setProductFormData({ ...productFormData, [name]: value }); //sets name for each variable productFormData into what the user input

        setProductFormData(input => {
            const productFormData = { ...input }

            switch (type) {
                case 'number':
                    productFormData[name] = Number(value);
                    break;
                default:
                    productFormData[name] = value;
            }
            return productFormData;
        });


    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(productFormData)
        console.log(productFormData.productId)

        try {
            //adds product to database based on input form information stored in productFormData variable
            const { data } = addProduct({
                variables: {
                    productId: productFormData.productId,
                    productName: productFormData.productName,
                    // productType: productFormData.productType,
                    productPrice: productFormData.productPrice,
                    productCategory: productFormData.productCategory,
                    productInventory: productFormData.productInventory,
                    productUnits: productFormData.productUnits,
                    productAllergens: productFormData.productAllergens,
                    // productAvailability: productFormData.productAvailability,
                    productDescription: productFormData.productDescription,
                    productImage: productFormData.productImage,
                },
            });
            return data;
        } catch (err) {
            console.error(err);
            console.log(productFormData)
        }

        // setProductFormData({
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
        //     productImage: '',
        // });
    };

    // async function handleImageUpload() {
    //     const data = new FormData()
    //     data.append("file", image)
    // }

    return (
        <Container>
            <Form onSubmit={handleFormSubmit} className="d-flex flex-column">
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='12345'
                        name='productId'
                        onChange={handleInputChange}
                        value={productFormData.productId}
                        required
                        className='productId' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        name='productName'
                        onChange={handleInputChange}
                        value={productFormData.productName}
                        required
                        className='productName' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='12.99'
                        name='productPrice'
                        onChange={handleInputChange}
                        value={productFormData.productPrice}
                        required
                        className='productPrice' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='vegetable'
                        name='productCategory'
                        onChange={handleInputChange}
                        value={productFormData.productCategory}
                        required
                        className='productCategory' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='99'
                        name='productInventory'
                        onChange={handleInputChange}
                        value={productFormData.productInventory}
                        className='productInventory' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Units</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='oz'
                        name='productUnits'
                        onChange={handleInputChange}
                        value={productFormData.productUnits}
                        className='productUnits'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Allergens</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='nuts'
                        name='productAllergens'
                        onChange={handleInputChange}
                        value={productFormData.productAllergens}
                        className='productAllergens'
                    ></Form.Control>
                </Form.Group>

                {/* <Form.Group>
                    <Form.Label>Available</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='true'
                        name='productAvailability'
                        onChange={handleInputChange}
                        value={productFormData.productAvailability}
                        className='productAvailability'
                    />
                    <Form.Check
                        type="radio"
                        name='productAvailability'
                        label="Yes"
                        onChange={handleInputChange}
                        value="true"
                    />
                    <Form.Check
                        type="radio"
                        name='productAvailability'
                        label="No"
                        onChange={handleInputChange}
                        value="false"
                    />
                </Form.Group> */}

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Apple a day keeps the doc away.'
                        name='productDescription'
                        onChange={handleInputChange}
                        value={productFormData.productDescription}
                        className='productDescription'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className='UploadImg mt-4 mb-5'>
                        <div>
                            Upload
                        </div>
                        <Form.Control
                            type="file"
                            name='productImage'
                            onChange={handleInputChange}
                            value={productFormData.productImage}
                            className='productImage'
                        />
                    </Form.Label>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}