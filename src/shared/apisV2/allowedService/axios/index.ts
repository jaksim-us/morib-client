import axios from 'axios';

import { ALLOWEDSERVICE_MOCK_URL } from '@/mocks/allowedService/resolvers/allowedServiceResolvers';

export const getAllowedServiceSet = async (category: string) => {
	const { data } = await axios.get(ALLOWEDSERVICE_MOCK_URL.GET_SETS, {
		params: { category },
	});
	return data;
};

export const getAllowedServiceSetDetail = async (category: string, allowedServiceSetId: number) => {
	const { data } = await axios.get(ALLOWEDSERVICE_MOCK_URL.GET_SETS, {
		params: { category, allowedServiceSetId },
	});
	return data;
};

export const getRecommendServices = async (category: string) => {
	const { data } = await axios.get(ALLOWEDSERVICE_MOCK_URL.GET_RECOMMEND_SERVICES, {
		params: { category },
	});
	return data;
};
