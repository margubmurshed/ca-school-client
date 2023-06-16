import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';

const useClasses = (status) => {
    const auth = useAuth();
    const {data = [], isLoading, refetch} = useQuery({
        queryKey: ['classes', auth.user],
        queryFn: async() => {
            const response = await axios.get(`https://ca-school-server-production.up.railway.app/classes?status=${status}`);
            return response.data;
        }
    })
    return [data, isLoading, refetch]
};

export default useClasses;