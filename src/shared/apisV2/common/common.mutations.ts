import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { GetUrlNameReq, GetUrlNameRes } from '@/shared/types/api/common';

import { getUrlName } from './common.api';

export const useGetUrlName = () => {
	return useMutation<GetUrlNameRes, AxiosError, GetUrlNameReq>({
		mutationFn: getUrlName,
		onSuccess: (response) => {
			return response.data.tabName;
		},
	});
};
