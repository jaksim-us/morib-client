import axios from 'axios';

import { SETTING_MODAL_URL } from '@/mocks/modal/resolvers/settingModalResover';

export const getUserProfile = async () => {
	const { data } = await axios.get(SETTING_MODAL_URL.GET_PROFILE_INFO);
	return data;
};
