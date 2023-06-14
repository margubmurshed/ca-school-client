import React from 'react';
import useInstructor from '../hooks/useInstructor';
import { Navigate } from 'react-router-dom';

const InstructorRoute = ({children}) => {
    const [instructor, instructorLoading] = useInstructor();

    if(instructorLoading) return (
        <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    )

    if(instructor) return children;
    else return <Navigate to="/"/>
};

export default InstructorRoute;