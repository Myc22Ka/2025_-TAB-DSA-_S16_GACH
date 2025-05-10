import { IAttractionDetails } from '@/interfaces/IAttractionDetails';
import { API_URL, get } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

/**
 * Fetches all attractions
 */
const fetchAllAttractions = async (): Promise<IAttractionDetails[]> => {
    // Make sure the URL is correctly formatted
    const url = `${API_URL}/attractions/details`;

    const response: IAttractionDetails[] = await get(url);

    return response;
};

/**
 * Custom hook to fetch all attractions
 * @returns Query result containing all attractions data, loading and error states
 */
export const useAllAttractions = () => {
    return useQuery({
        queryKey: ['attractions', 'all'],
        queryFn: fetchAllAttractions,
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        retry: 2, // Retry failed requests twice
    });
};

export default useAllAttractions;
