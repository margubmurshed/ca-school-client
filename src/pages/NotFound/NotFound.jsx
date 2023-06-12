import React from 'react';
import NotFoundImg from '../../assets/Images/NotFound/NotFound.png';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='h-screen flex justify-center items-center p-5'>
            <div className='text-center'>
                <img src={NotFoundImg} alt="not_found" className="max-w-[500px]"/>
                <h2 className='text-4xl'>We couldn't find it</h2>
                <Link to="/" className='btn btn-sm mt-5 bg-ca-primary text-white hover:bg-ca-secondary'>Back to Home</Link>

            </div>
        </div>
    );
};

export default NotFound;