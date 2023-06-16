import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const useInstructors = () => {
    const {data = [], isLoading} = useQuery({
        queryKey: ['instructors'],
        queryFn: async() => {
            const response = await axios.get("https://ca-school-server-production.up.railway.app/instructors");
            return response.data;
        }
    })
    return [data, isLoading]
};

export default useInstructors;