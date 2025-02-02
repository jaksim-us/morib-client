import { GetUrlNameReq, GetUrlNameRes } from '@/shared/types/api/common';

import { authClient } from '../client';

export const COMMON_ENDPOINT = {
	GET_URL_NAME: 'api/v2/tabName',
};

export const getUrlName = async ({ url }: GetUrlNameReq): Promise<GetUrlNameRes> => {
	const { data } = await authClient.get(COMMON_ENDPOINT.GET_URL_NAME, { params: { url } });
	return data;
};
