import React from "react";
import { Link } from 'react-router-dom';
import vegCircle from '../styles/img/veg-circle.png';
import pepper from '../styles/img/pepper.png';
import onion from '../styles/img/onion.png';
import corn from '../styles/img/corn.png';
import pumpkin from '../styles/img/pumpkin.png';

function Landing() {
    return (
        <div className="landing-page-container">
            <div className="row align-items-center justify-content-center">

                <div className="col-md-3 landing-left">
                    <img src={pepper} alt="Image 1" className="landing-page-image-pepper" />
                    <img src={corn} alt="Image 2" className="landing-page-image-corn" />
                </div>

                <div className="col-md-6 text-center">
                    <h2 className="landing-page-title-sm">Welcome to </h2>
                    <h1 className="landing-page-title">ProducePal</h1>
                    <p className="landing-page-description">
                        Join our CSA farm community of like-minded individuals who share a passion for healthy, sustainable living. Our CSA farms strive to offer fresh, organic produce for pickup at farmers market locations. Explore our website to learn more about our farms and CSA program.
                    </p>
                    <Link to='/home'>
                        <button className="landing-page-explore-btn btn btn-secondary">
                            Explore Now
                        </button>
                    </Link>
                    <div className="container landing-img-box">
                        <img className='landing-page-image img-fluid' src={vegCircle} />
                    </div>
                </div>

                <div className="col-md-3 landing-right">
                    <img src={onion} alt="Image 3" className="landing-page-image-onion" />
                    <img src={pumpkin} alt="Image 4" className="landing-page-image-pumpkin" />
                </div>
            </div>
        </div >
    );
}

export default Landing;
