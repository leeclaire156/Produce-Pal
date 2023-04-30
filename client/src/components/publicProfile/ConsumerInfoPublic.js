import React from 'react';
import './userInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap';
import 'react-bootstrap';
import { useQuery } from '@apollo/client';
// import { QUERY_SINGLE_PROFILE } from '../../utils/queries';
import { useParams } from 'react-router-dom';

function ConsumerInfoPublic(props) {

    // const { id } = useParams();
    // window.localStorage.setItem("userObjectId", JSON.stringify(id));
    // console.log(id);

    // const { loading, error, data } = useQuery(QUERY_SINGLE_PROFILE, {
    //     variables: { id }
    // });

    // const userData = data?.user || {};

    console.log(props);

    return (
        <div className="container-fluid">
            <div>yes i am a user</div>
        </div>
    );

}

export default ConsumerInfoPublic;
