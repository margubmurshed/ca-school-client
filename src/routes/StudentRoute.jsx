import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({children}) => {
    const [admin, adminLoading] = useAdmin();
    const [instructor, instructorLoading] = useInstructor();

    if(adminLoading || instructorLoading) return (
        <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    )

    if(!admin && !instructor) return children;
    else return <Navigate to="/"/>
};

export default StudentRoute;