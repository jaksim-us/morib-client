import axios from 'axios';

import { authClient } from '@/shared/apis/client';

import { getAccessToken } from '@/shared/utils/auth';

import { reissueRes } from '@/shared/types/api/auth';

const AUTH_URL = {
	PATCH_REISSUE_TOKEN: 'api/v2/users/reissue',
	POST_LOGOUT: 'api/v2/users/logout',
};

export const patchReissueToken = async (): Promise<reissueRes> => {
	const accessToken = getAccessToken();

	const { data } = await axios.patch(AUTH_URL.PATCH_REISSUE_TOKEN, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return data;
};

export const postLogout = async () => {
	await authClient.post(AUTH_URL.POST_LOGOUT);
};
