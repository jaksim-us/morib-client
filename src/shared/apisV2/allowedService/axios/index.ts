import axios from 'axios';

import { ALLOWEDSERVICE_MOCK_URL } from '@/mocks/allowedService/resolvers/allowedServiceResolvers';

export const getRecommendServices = async (category: string) => {
	const { data } = await axios.get(ALLOWEDSERVICE_MOCK_URL.GET_RECOMMEND_SERVICES, {
		params: { category },
	});
	return data;
};
