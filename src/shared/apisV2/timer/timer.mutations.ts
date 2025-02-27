import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostApplyAllowedServiceGroupReq } from '@/shared/types/api/timer';

import { postApplyAllowedServiceGroup, postStartTimer, postStopTimer } from './timer.api';
import { timerKeys } from './timer.keys';

export const usePostStopTimer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postStopTimer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
		},
	});
};

export const usePostStartTimer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postStartTimer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
		},
	});
};

export const usePostApplyAllowedServiceGroup = ({ allowedGroupIdList }: PostApplyAllowedServiceGroupReq) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => postApplyAllowedServiceGroup({ allowedGroupIdList }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.popover() });
		},
	});
};
