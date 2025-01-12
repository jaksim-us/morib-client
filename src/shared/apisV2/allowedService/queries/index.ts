import { useQuery } from '@tanstack/react-query';

import { getRecommendServices } from './../axios/index';

export const useGetRecommendService = (category: string) => {
	return useQuery({
		queryKey: ['recommendServices', category],
		queryFn: () => getRecommendServices(category),
	});
};
