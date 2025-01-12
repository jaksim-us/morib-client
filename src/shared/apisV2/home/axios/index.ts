import axios from 'axios';

import { FRIEND_MODAL_URL } from '@/mocks/home/resolvers/friendModalResover';
import { HOME_MOCK_URL } from '@/mocks/home/resolvers/homeResolvers';

export const getCategoryTask = async (startDate: string, endDate: string) => {
	const { data } = await axios.get(HOME_MOCK_URL.GET_CATEGORY, {
		params: { startDate, endDate },
	});
	return data;
};

export const getFriendProfile = async () => {
	const { data } = await axios.get(FRIEND_MODAL_URL.GET_PROFILE_INFO);
	return data;
};
