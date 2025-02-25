import { useQuery } from '@tanstack/react-query';

import { GetTimerTodosReq } from '@/shared/types/api/timer';

import { getPopoverAllowedServiceList, getTimerFriends, getTimerTodos } from './timer.api';
import { timerKeys } from './timer.keys';

export const useGetTimerTodos = ({ targetDate }: GetTimerTodosReq) => {
	return useQuery({
		queryKey: timerKeys.todos({ targetDate }),
		queryFn: () => getTimerTodos({ targetDate }),
	});
};

export const useGetTimerFriends = () => {
	return useQuery({
		queryKey: timerKeys.friends(),
		queryFn: getTimerFriends,
	});
};

export const useGetPopoverAllowedServiceList = () => {
	return useQuery({
		queryKey: timerKeys.popover(),
		queryFn: getPopoverAllowedServiceList,
	});
};
