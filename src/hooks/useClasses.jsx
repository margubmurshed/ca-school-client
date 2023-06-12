import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const useClasses = () => {
    const {data = [], isLoading} = useQuery({
        queryKey: ['classes'],
        queryFn: async() => {
            const response = await axios.get("http://localhost:5000/classes");
            return response.data;
        }
    })
    return [data, isLoading]
};

export default useClasses;