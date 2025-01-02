import axios from 'axios';

import { HOME_MOCK_URL } from '@/mocks/home/resolvers/homeResolvers';

export const getCategoryTask = async (startDate: string, endDate: string) => {
	const { data } = await axios.get(HOME_MOCK_URL.GET_CATEGORY, {
		params: { startDate, endDate },
	});
	return data;
};
