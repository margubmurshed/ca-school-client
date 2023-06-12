import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const useInstructors = () => {
    const {data = [], isLoading} = useQuery({
        queryKey: ['instructors'],
        queryFn: async() => {
            const response = await axios.get("http://localhost:5000/instructors");
            return response.data;
        }
    })
    return [data, isLoading]
};

export default useInstructors;