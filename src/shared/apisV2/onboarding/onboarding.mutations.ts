import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { PostInterestAreaReq, PostInterestAreaRes } from '@/shared/types/api/onboarding';

import { postInterestArea } from './onboarding.api';

export const usePostInterestArea = () => {
	return useMutation<PostInterestAreaRes, AxiosError, PostInterestAreaReq>({
		mutationFn: postInterestArea,
	});
};
