import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';

import axios from "axios";

export default function Upload() {
    // set initial form state
    const [productFormData, setProductFormData] = useState({
        productId: '',
        productName: '',
        productType: '',
        productPrice: '',
        productCategory: '',
        productInventory: '',
        productUnits: '',
        productAllergens: '',
        productAvailability: '',
        productDescription: '',
        productImage: '',
    });

    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadSingleImage(base64) {
        setLoading(true);
        axios
            .post("http://localhost:3000/uploadImage", { image: base64 })
            .then((res) => {
                setUrl(res.data);
                alert(`Image uploaded Successfully. Url is ${url}`);
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    // Ignore this but dont comment it out
    function uploadMultipleImages(images) {
        setLoading(true);
        axios
            .post("http://localhost:3000/uploadMultipleImages", { images })
            .then((res) => {
                setUrl(res.data);
                alert("Image uploaded Successfully");
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }

        const base64s = [];
        for (var i = 0; i < files.length; i++) {
            var base = await convertBase64(files[i]);
            base64s.push(base);
        }
        uploadMultipleImages(base64s);
    };

    const handleInputChange = (event) => {
        const { name, type, value } = event.target;
        setProductFormData(input => {
            const productFormData = { ...input }

            switch (type) {
                case 'number':
                    productFormData[name] = Number(value);
                    break;
                case 'radio':
                    if (value == "true") { productFormData[name] = true } else { productFormData[name] = false }
                    break;
                default:
                    productFormData[name] = value;
            }
            return productFormData;
        });
    };

    // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_USER mutation
    const [addProduct] = useMutation(ADD_PRODUCT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(productFormData)
        try {
            //adds product to database based on input form information stored in productFormData variable
            const { data } = addProduct({
                variables: {
                    productId: productFormData.productId,
                    productName: productFormData.productName,
                    productType: productFormData.productType,
                    productPrice: productFormData.productPrice,
                    productCategory: productFormData.productCategory,
                    productInventory: productFormData.productInventory,
                    productUnits: productFormData.productUnits,
                    productAllergens: productFormData.productAllergens,
                    productAvailability: productFormData.productAvailability,
                    productDescription: productFormData.productDescription,
                    productImage: url,
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

    return (
        <Container>
            <Form onSubmit={handleFormSubmit} className="d-flex flex-column">
                <Form.Group>
                    <Form.Label>ID REQUIRED</Form.Label>
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
                    <Form.Label>Name REQUIRED</Form.Label>
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
                    <Form.Label>Type REQUIRED</Form.Label>
                    <Form.Check
                        type="radio"
                        name='productType'
                        label="Sharebox"
                        onChange={handleInputChange}
                        value="true"
                    />
                    <Form.Check
                        type="radio"
                        name='productType'
                        label="Produce"
                        onChange={handleInputChange}
                        value="false"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price REQUIRED</Form.Label>
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

                <Form.Group>
                    <Form.Label>Availability</Form.Label>
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
                </Form.Group>

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
                            id="dropzone-file"
                            type="file"
                            name='productImage'
                            onChange={uploadImage}
                            className='productImage'
                        />
                    </Form.Label>
                </Form.Group>
                {loading ? (
                    <Button type="submit" disabled>Submit</Button>
                ) : (
                    <Button type="submit">Submit</Button>
                )}
            </Form>
        </Container>
    )
}