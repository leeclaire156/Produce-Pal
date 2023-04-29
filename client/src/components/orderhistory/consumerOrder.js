import React from 'react';

const ConsumerOrder = (props) => {
    function convertDate() {
        const dateToInt = (parseInt(props.purchaseDate))
        const convertedDate = new Date(dateToInt) // date as an object
        const monthDayYearDate = convertedDate.toLocaleDateString('en-US'); // date as a string M/DD/YYYY
        return monthDayYearDate
    }
    
    return (
        <div className='container-fluid card mb-3 order-history-card'>
            <div className="row align-items-center d-flex">
                <div className="col-sm-12 col-md-2 mb-2 mb-md-0 text-center text-md-left">
                    <img src={props.buyerName[0]?.userImage ? props.buyerName[0]?.userImage : 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1682387797/lbicrrh84geqa1pgrmdy.png'}
                        alt=""
                        className="img-fluid" />
                </div>
                <div className="col-sm-12 col-md-7 mb-2 mb-md-0 text-center text-md-start mt-2 order-history-text">
                    <h4 className='mb-3'>Order # {props.orderId}</h4>
                    <p>Vendor name: {props.sellerName}</p>
                    <p>Order date: {convertDate()}</p>
                </div>

                <div className="col-sm-12 col-md-3 text-center text-md-end pe-md-5 pb-md-0 pb-3">
                    <button type="button" className="btn btn-secondary btn-sm order-status-btn" disabled>{props.orderType}</button>
                    <button type="button" className="btn btn-primary btn-sm ms-md-2 ms-3" data-bs-toggle="modal" data-bs-target={`#consumerOrderModal-${props._id}`}>View</button>
                </div>
            </div>

            {/* <!-- view My Orders Modal (for buyers/personal acct) --> */}
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
                                            src={props.buyerName[0]?.userImage ? props.buyerName[0]?.userImage : 'https://res.cloudinary.com/dcvtyvwii/image/upload/v1682387797/lbicrrh84geqa1pgrmdy.png'}
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className='d-flex flex-column align-items-start order-history-text'>
                                        <h4 className='fs-4 mb-3'>Order # {props.orderId}</h4>
                                        <p className='mb-3'>Vendor name: {props.sellerName}</p>
                                        <p className='mb-3'>Order date: {convertDate()}</p>
                                    </div>

                                    <div className='order-history-text'>
                                        <h5 className='mb-3'>Order items:</h5>
                                        {props.products.map((product) => (
                                            <p key={product._id}>
                                                {product.productName} ({product.productUnits}) - ${product.productPrice}
                                                {/* If quantity is able to be passed */}
                                                {/* {product.productName} ({product.productUnits}) - ${product.productPrice} x {product.productQuantity} */}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className='d-flex flex-column align-items-start'>
                                        <div className='order-history-text'>Total: ${" "}
                                            {props.products.reduce(
                                                (totalPrice, product) => totalPrice + product.productPrice,
                                                // (totalPrice, product) => totalPrice + (product.productPrice * product.productQuantity),
                                                0
                                            ).toFixed(2)}
                                        </div>
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
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};


export default ConsumerOrder;
