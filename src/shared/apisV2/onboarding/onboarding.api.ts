import axios from 'axios';

import { PostInterestAreaReq, PostInterestAreaRes } from '@/shared/types/api/onboarding';

import { ONBOARDING_MOCK_URL } from '@/mocks/onboarding/onboarding.resolvers';

//NOTE: 쿼리스트링 형식 변경해주기
export const postInterestArea = async ({
	serviceList,
	interestArea,
}: PostInterestAreaReq): Promise<PostInterestAreaRes> => {
	const { data } = await axios.post(ONBOARDING_MOCK_URL.POST_INTEREST_AREA, serviceList, {
		params: { interestArea },
	});
	return data;
};
