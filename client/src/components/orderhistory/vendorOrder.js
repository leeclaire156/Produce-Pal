import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { UPDATE_ORDER_STATUS } from '../../utils/mutations';
import { GET_ORDER_TYPE } from '../../utils/queries';
import { Link } from 'react-router-dom';

const VendorOrder = (props) => {
    // const buyerId = props._id;
    // console.log(buyerId);

    const [formState, setFormState] = useState('')
    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState) {
            await updateOrderStatus({
                variables: {
                    order: props._id,
                    orderType: formState.orderType
                }, refetchQueries: [{ query: GET_ORDER_TYPE }]
            });
        } else {
            return
        }
    };
    console.log(formState);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState(input => {
            const formState = { ...input }
            formState[name] = value;
            return formState;
        });
    };

    function convertDate() {
        const dateToInt = (parseInt(props.purchaseDate))
        const convertedDate = new Date(dateToInt) // date as an object
        const monthDayYearDate = convertedDate.toLocaleDateString('en-US'); // date as a string M/DD/YYYY
        return monthDayYearDate
    }

    function total() {
        const totalArray = []
        for (var i = 0; i < props.products.length; i++) {
            console.log(props.quantity[i] * props.products[i].productPrice)
            totalArray.push((props.quantity[i] * props.products[i].productPrice))
        }
        console.log(totalArray)
        let sum = totalArray.reduce(function (a, b) {
            return a + b;
        });
        var roundedSum = sum.toFixed(2)
        return (roundedSum)
    }
    console.log(props);
    return (
        <div className='container-fluid card mb-3 order-history-card'>
            <div className="row align-items-center d-flex">

                <div className="col-sm-12 col-md-2 mb-2 mb-md-0 text-center text-md-left history-img-container">
                    <Link to={`profile/consumer/${props.buyerName[0]?._id}`}>
                        <img src={props.buyerName[0]?.userImage ? props.buyerName[0]?.userImage : 'https://placehold.co/150x150'}
                            alt=""
                            className="img-fluid" />
                    </Link>
                </div>

                <div className="col-sm-12 col-md-7 mb-2 mb-md-0 text-center text-md-start mt-2 order-history-text">
                    <h4 className='mb-3'>Order # {props.orderId}</h4>
                    <p>Buyer name: {`${props.buyerName[0]?.firstName} ${props.buyerName[0]?.lastName}`}</p>
                    <p>Order date: {convertDate()}</p>
                </div>

                <div className="col-sm-12 col-md-3 text-center text-md-end pe-md-5 pb-md-0 pb-3">
                    <button type="button" className="btn btn-secondary btn-sm order-status-btn" disabled>{props.orderType}</button>
                    <button type="button" className="btn btn-secondary btn-sm ms-md-2 ms-3" data-bs-toggle="modal" data-bs-target={`#vendorOrderModal-${props._id}`}>View</button>
                </div>
            </div>

            {/* <!-- view Consumers' orders Modal (for store) --> */}
            <div className="modal fade" id={`vendorOrderModal-${props._id}`} tabIndex="-1" aria-labelledby={`vendorOrderModalLabel-${props._id}`} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`vendorOrderModalLabel-${props._id}`}>Order details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center mb-3">
                                <div className="col-md-3">
                                    <div className='d-flex flex-column align-items-center mb-3'>
                                        <img src={props.buyerName[0]?.userImage ? props.buyerName[0]?.userImage : 'https://placehold.co/150x150'}
                                            alt=""
                                            className="img-fluid" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className='d-flex flex-column align-items-start order-history-text'>

                                        <h4 className='fs-4'>Order # {props.orderId}</h4>
                                        <p className='mb-3'>Buyer name: {`${props.buyerName[0]?.firstName} ${props.buyerName[0]?.lastName}`}</p>
                                        <p className='mb-3'>Order date: {convertDate()}</p>
                                        <form className='mb-3' onSubmit={handleFormSubmit}>
                                            <select className="form-select" aria-label="select-order-status" defaultValue="Paid" name='orderType' onChange={handleInputChange}>
                                                <option value="Paid">Paid</option>
                                                <option value="Ready">Ready</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                            <button type="submit" className='btn btn-primary btn-sm mt-3'>
                                                submit
                                            </button>
                                        </form>
                                    </div>

                                    <div className='order-history-text'>
                                        <h5 className='mb-3'>Order items:</h5>
                                        {props.products.map((product, i) => (
                                            <p key={product._id}>
                                                {product.productName} ({product.productUnits}) - ${product.productPrice} x {props.quantity[i]}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className='d-flex flex-column align-items-start'>
                                        <div className='order-history-text'>Total: ${" "} {total()} </div>
                                        <button
                                            type="button"
                                            className='btn btn-secondary btn-sm mt-3 order-status-btn'
                                            disabled
                                        >
                                            {props.orderType}
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* note: Maybe don't use the Save button. when the vendor select one option in the dropdown list, the 'orderType'
                            will be changed at the same time in the database */}
                            {/* <button type="submit" className="btn btn-primary">Save</button> */}
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};


export default VendorOrder;
