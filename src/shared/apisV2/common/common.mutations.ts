import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { GetUrlNameReq, GetUrlNameRes } from '@/shared/types/api/common';

import { homeKeys } from '../home/home.keys';
import { timerKeys } from '../timer/timer.keys';
import { getUrlName, postToggleTaskStatus } from './common.api';

export const useGetUrlName = () => {
	return useMutation<GetUrlNameRes, AxiosError, GetUrlNameReq>({
		mutationFn: getUrlName,
		onSuccess: (response) => {
			return response.data.tabName;
		},
	});
};

export const usePostToggleTaskStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postToggleTaskStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};
