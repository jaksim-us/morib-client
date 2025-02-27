import {
	GetPopoverAllowedServiceListRes,
	GetTimerFriendsRes,
	GetTimerTodosReq,
	GetTimerTodosRes,
	PostApplyAllowedServiceGroupReq,
	PostStartTimerReq,
	PostStopTimerReq,
} from '@/shared/types/api/timer';

import { authClient } from '../client';

const TIMER_ENDPOINT = {
	GET_TIMER_TODOS: 'api/v2/timer/todo-card',
	GET_TIMER_FRIENDS: 'api/v2/timer/friends',
	POST_STOP_TIMER: 'api/v2/timer/stop/:taskId',
	POST_TIMER_START: 'api/v2/timer/run',
	GET_POPOVER_ALLOWED_SERVICE_LIST: 'api/v2/timer/allowedGroups',
	POST_APPLY_ALLOWED_SERVICE_GROUP: 'api/v2/timer/allowedGroups',
};

export const getTimerTodos = async ({ targetDate }: GetTimerTodosReq): Promise<GetTimerTodosRes> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_TIMER_TODOS, { params: { targetDate } });
	return data;
};

export const getTimerFriends = async (): Promise<GetTimerFriendsRes> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_TIMER_FRIENDS);
	return data;
};

export const postStopTimer = async ({ taskId, elapsedTime, targetDate, runningCategoryName }: PostStopTimerReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_STOP_TIMER.replace(':taskId', String(taskId)), {
		elapsedTime,
		targetDate,
		runningCategoryName,
	});
	return data;
};

export const postStartTimer = async ({ elapsedTime, runningCategoryName, taskId }: PostStartTimerReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_TIMER_START, { elapsedTime, runningCategoryName, taskId });
	return data;
};

export const getPopoverAllowedServiceList = async (): Promise<GetPopoverAllowedServiceListRes> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_POPOVER_ALLOWED_SERVICE_LIST);
	return data;
};

export const postApplyAllowedServiceGroup = async ({ allowedGroupIdList }: PostApplyAllowedServiceGroupReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_APPLY_ALLOWED_SERVICE_GROUP, { allowedGroupIdList });
	return data;
};
