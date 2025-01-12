import { HttpResponse, http } from 'msw';

import { ALLOW_RES } from '../responses/allowedServiceResponses';

export const ALLOWEDSERVICE_MOCK_URL = {
	GET_SETS: 'api/v2/allowedServiceSet/:category',
	GET_SETS_DETAIL: 'api/v2/allowedServiceSet/:allowedServiceSetId/:category',
	GET_RECOMMEND_SERVICES: 'api/v2/allowedServiceSet/recommendSite/:category',
};

export const allowedServiceResolvers = [
	http.get(ALLOWEDSERVICE_MOCK_URL.GET_SETS, async ({ params }) => {
		const { category } = params;

		if (!category) {
			throw new HttpResponse(null, { status: 400 });
		}

		return HttpResponse.json(ALLOW_RES.GET_SETS);
	}),

	http.get(ALLOWEDSERVICE_MOCK_URL.GET_SETS_DETAIL, async ({ params }) => {
		const { allowedServiceSetId, category } = params;

		if (!category || !allowedServiceSetId) {
			throw new HttpResponse(null, { status: 400 });
		}

		return HttpResponse.json(ALLOW_RES.GET_SETS_DETAIL);
	}),

	http.get(ALLOWEDSERVICE_MOCK_URL.GET_RECOMMEND_SERVICES, async ({ params }) => {
		const { category } = params;

		if (!category) {
			throw new HttpResponse(null, { status: 400 });
		}

		return HttpResponse.json(ALLOW_RES.GET_RECOMMEND_SERVICES);
	}),
];
