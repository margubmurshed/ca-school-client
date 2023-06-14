import React from 'react';
import useAdmin from '../hooks/useAdmin';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [admin, adminLoading] = useAdmin();

    if(adminLoading) return (
        <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    )

    if(admin) return children;
    else return <Navigate to="/"/>
};

export default AdminRoute;