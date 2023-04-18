// This text is to allow GitHub to recognize this file and it parent folder's existence
// This text is to allow GitHub to recognize this file and it parent folder's existence
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_PRODUCE } from '../utils/mutations';


export default function Upload() {
    // set initial form state
    const [produceFormData, setProduceFormData] = useState({
        produceId: '',
        produceName: '',
        produceType: '',
        producePrice: '',
        produceInventory: '',
        produceUnits: '',
        produceAllergens: '',
        // produceAvailability: '',
        produceDescription: '',
        produceImage: '',
    });

    // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_USER mutation
    const [AddProduce] = useMutation(ADD_PRODUCE);

    const handleInputChange = (event) => {
        const { name, type, value } = event.target;
        // setProduceFormData({ ...produceFormData, [name]: value }); //sets name for each variable produceFormData into what the user input

        //    [ type='text'
        //     placeholder='true'
        //     name='produceAvailability'
        //     onChange={handleInputChange}
        //     value={produceFormData.produceAvailability}
        //     className='produceAvailability']

        setProduceFormData(input => {
            const produceFormData = { ...input }

            switch (type) {
                case 'number':
                    produceFormData[name] = Number(value);
                    break;
                default:
                    produceFormData[name] = value;
            }
            return produceFormData;
        });


    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(produceFormData) //form contents work


        try {
            const { data } = AddProduce({
                variables: { ...produceFormData }, //adds produce to database based on input form information stored in produceFormData variable
            });
        } catch (err) {
            console.error(err);
            console.log(produceFormData) //form contents work
        }

        // setProduceFormData({
        //     produceId: '',
        //     produceName: '',
        //     produceType: '',
        //     producePrice: '',
        //     produceInventory: '',
        //     produceUnits: '',
        //     produceAllergens: '',
        //     produceAvailability: '',
        //     produceDescription: '',
        //     produceImage: '',
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
                        name='produceId'
                        onChange={handleInputChange}
                        value={produceFormData.produceId}
                        required
                        className='produceId' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        name='produceName'
                        onChange={handleInputChange}
                        value={produceFormData.produceName}
                        required
                        className='produceName' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='vegetable'
                        name='produceType'
                        onChange={handleInputChange}
                        value={produceFormData.produceType}
                        required
                        className='produceType' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='12.99'
                        name='producePrice'
                        onChange={handleInputChange}
                        value={produceFormData.producePrice}
                        required
                        className='producePrice' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='99'
                        name='produceInventory'
                        onChange={handleInputChange}
                        value={produceFormData.produceInventory}
                        className='produceInventory' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Units</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='oz'
                        name='produceUnits'
                        onChange={handleInputChange}
                        value={produceFormData.produceUnits}
                        className='produceUnits'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Allergens</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='nuts'
                        name='produceAllergens'
                        onChange={handleInputChange}
                        value={produceFormData.produceAllergens}
                        className='produceAllergens'
                    ></Form.Control>
                </Form.Group>

                {/* <Form.Group>
                    <Form.Label>Available</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='true'
                        name='produceAvailability'
                        onChange={handleInputChange}
                        value={produceFormData.produceAvailability}
                        className='produceAvailability'
                    />
                    <Form.Check
                        type="radio"
                        name='produceAvailability'
                        label="Yes"
                        onChange={handleInputChange}
                        value="true"
                    />
                    <Form.Check
                        type="radio"
                        name='produceAvailability'
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
                        name='produceDescription'
                        onChange={handleInputChange}
                        value={produceFormData.produceDescription}
                        className='produceDescription'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className='UploadImg mt-4 mb-5'>
                        <div>
                            Upload
                        </div>
                        <Form.Control
                            type="file"
                            name='produceImage'
                            onChange={handleInputChange}
                            value={produceFormData.produceImage}
                            className='produceImage'
                        />
                    </Form.Label>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}