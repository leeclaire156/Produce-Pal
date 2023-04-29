import React from 'react';

const ConsumerOrder = (props) => {
    return (
        <div className='container-fluid card mb-3 order-history-card'>
            <div className="row align-items-center d-flex">
                <div className="col-sm-12 col-md-2 mb-2 mb-md-0 text-center text-md-left">
                    <img src="https://placehold.co/150x150"
                        alt=""
                        className="img-fluid" />
                </div>
                <div className="col-sm-12 col-md-7 mb-2 mb-md-0 text-center text-md-start mt-2 order-history-text">
                    <h4 className='mb-3'>Order # {props.orderId}</h4>
                    <p>Vendor name: {props.sellerName.vendorName}</p>
                    <p>Order date: {new Date(props.purchaseDate * 1000).toLocaleDateString()}</p>
                </div>

                <div className="col-sm-12 col-md-3 text-center text-md-end pe-md-5 pb-md-0 pb-3">
                    <button type="button" className="btn btn-secondary btn-sm order-status-btn">{props.orderType}</button>
                    <button type="button" className="btn btn-primary btn-sm ms-md-2 ms-3" data-bs-toggle="modal" data-bs-target={`#consumerOrderModal-${props._id}`}>View</button>
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
                                    <div className='d-flex flex-column align-items-center'>
                                        <img
                                            src='https://placehold.co/150x150'
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className='d-flex flex-column align-items-start order-history-text'>

                                        <h4 className='fs-4 mb-3'>Order # {props.orderId}</h4>
                                        <p className='mb-3'>Vendor name: {props.sellerName.vendorName}</p>
                                        <p className='mb-3'>Order date: {new Date(props.purchaseDate * 1000).toLocaleDateString()}</p>
                                    </div>

                                    <div className='order-history-text'>
                                        <h5 className='mb-3'>Order items:</h5>
                                        {props.products.map((product) => (
                                            <p key={product._id}>
                                                {product.productName} ({product.productUnits}) - ${product.productPrice}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className='d-flex flex-column align-items-start'>
                                        <div className='order-history-text'>Toal: ${" "}
                                            {props.products.reduce(
                                                (totalPrice, product) => totalPrice + product.productPrice,
                                                0
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className='btn btn-danger btn-sm mt-3 order-status-btn'
                                        >
                                            {props.orderType}
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};


export default ConsumerOrder;
