import { HttpResponse, http } from 'msw';

import { SETTING_MODAL_RES } from '@/mocks/modal/responses/settingModalResponses';

export const SETTING_MODAL_URL = {
	GET_PROFILE_INFO: 'api/v2/profiles',
};

export const userProfileResolvers = [
	http.get(SETTING_MODAL_URL.GET_PROFILE_INFO, async () => {
		return HttpResponse.json(SETTING_MODAL_RES.GET_PROFILE_INFO);
	}),
];
