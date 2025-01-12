import { HttpResponse, http } from 'msw';

import { FRIEND_MODAL_RES } from '@/mocks/home/responses/friendModalResponses';

export const FRIEND_MODAL_URL = {
	GET_PROFILE_INFO: 'api/v2/profiles',
};

export const friendResolvers = [
	http.get(FRIEND_MODAL_URL.GET_PROFILE_INFO, async () => {
		return HttpResponse.json(FRIEND_MODAL_RES.GET_PROFILE_INFO);
	}),
];
