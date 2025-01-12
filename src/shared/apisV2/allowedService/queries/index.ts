import { useQuery } from '@tanstack/react-query';

import { getAllowedServiceSet, getAllowedServiceSetDetail, getRecommendServices } from './../axios/index';

export const useGetAllowedServiceSet = (category: string) => {
	return useQuery({
		queryKey: ['ServiceSet', category],
		queryFn: () => getAllowedServiceSet(category),
	});
};

export const useGetAllowedServiceSetDetail = (category: string, allowedServiceSetId: number) => {
	return useQuery({
		queryKey: ['ServiceSet', category, allowedServiceSetId],
		queryFn: () => getAllowedServiceSetDetail(category, allowedServiceSetId),
	});
};

export const useGetRecommendService = (category: string) => {
	return useQuery({
		queryKey: ['recommendServices', category],
		queryFn: () => getRecommendServices(category),
	});
};
