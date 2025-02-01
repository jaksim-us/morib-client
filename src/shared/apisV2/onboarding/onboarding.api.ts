import { PostInterestAreaReq, PostInterestAreaRes } from '@/shared/types/api/onboarding';

import { authClient } from '../client';

export const ONBOARDING_URL = {
	POST_INTEREST_AREA: 'api/v2/onboard',
};

export const postInterestArea = async ({
	serviceList,
	interestArea,
}: PostInterestAreaReq): Promise<PostInterestAreaRes> => {
	const { data } = await authClient.post(ONBOARDING_URL.POST_INTEREST_AREA, serviceList, {
		params: { interestArea },
	});
	return data;
};
