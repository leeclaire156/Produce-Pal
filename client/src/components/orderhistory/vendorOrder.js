import React from 'react';

const ConsumerOrder = (props) => {
    return (
        <div className='container-fluid'>
            <div className="row mt-4 align-items-center d-flex">
                <div className="col-sm-12 col-md-2 mb-2 mb-md-0 text-center text-md-left">
                    <img src="https://placehold.co/150x150"
                        alt=""
                        className="img-fluid" />
                </div>
                <div className="col-sm-12 col-md-7 mb-2 mb-md-0 text-center text-md-start">
                    <h4 className='mb-3'>Order # {props.orderId}</h4>
                    <p>Buyer name: {`${props.buyerName.firstName} ${props.buyerName.lastName}`}</p>
                    <p>Order date: {new Date(props.purchaseDate * 1000).toLocaleDateString()}</p>
                </div>

                <div className="col-sm-12 col-md-3 text-center text-md-end">
                    <button type="button" className="btn btn-secondary btn-sm">{props.orderType}</button>
                    <button type="button" className="btn btn-primary btn-sm ms-md-2" data-bs-toggle="modal" data-bs-target={`#consumerOrderModal-${props._id}`}>View</button>
                </div>
            </div>

            {/* <!-- view My orders Modal --> */}
            <div className="modal fade" id={`consumerOrderModal-${props._id}`} tabIndex="-1" aria-labelledby={`consumerOrderModalLabel-${props._id}`} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`consumerOrderModalLabel-${props._id}`}>Order details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center mb-3">
                                <div className="col-md-3">
                                    <div className='d-flex flex-column align-items-center mb-3'>
                                        <img
                                            src='https://placehold.co/150x150'
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className='d-flex flex-column align-items-start'>

                                        <h3 className='fs-4'>Order # {props.orderId}</h3>
                                        <div className='mb-3'>Buyer name: {`${props.buyerName.firstName} ${props.buyerName.lastName}`}</div>
                                        <div className='mb-3'>Order date: {new Date(props.purchaseDate * 1000).toLocaleDateString()}</div>
                                        <form className='mb-3'>
                                            <select className="form-select" aria-label="select-order-status" defaultValue="Set order status">

                                                <option defaultValue="pending">Pending</option>
                                                <option defaultValue="paid">Paid</option>
                                                <option defaultValue="ready">Ready</option>
                                                <option defaultValue="closed">Closed</option>
                                            </select>
                                            <button
                                                type="submit"
                                                className='btn btn-primary btn-sm mt-3'
                                            >
                                                submit
                                            </button>
                                        </form>
                                    </div>

                                    <div>
                                        <div className='fs-5 mb-3'>Order items:</div>
                                        {props.products.map((product) => (
                                            <p key={product._id}>
                                                {product.productName} ({product.productUnits}) - ${product.productPrice}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className='d-flex flex-column align-items-start'>
                                        <div>Toal: ${" "}
                                            {props.products.reduce(
                                                (totalPrice, product) => totalPrice + product.productPrice,
                                                0
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className='btn btn-success btn-sm mt-3'
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


export default ConsumerOrder;
