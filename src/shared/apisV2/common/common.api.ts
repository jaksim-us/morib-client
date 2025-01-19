import axios from 'axios';

import { GetUrlNameReq, GetUrlNameRes } from '@/shared/types/api/common';

import { COMMON_MOCK_URL } from '@/mocks/common/common.resolvers';

export const getUrlName = async ({ url }: GetUrlNameReq): Promise<GetUrlNameRes> => {
	const { data } = await axios.get(`${COMMON_MOCK_URL.GET_URL_NAME}?tabName=${url}`);
	return data;
};
