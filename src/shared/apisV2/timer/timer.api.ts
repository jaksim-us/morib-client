import { GetTimerTodosReq, GetTimerTodosRes, PostStopTimerReq, PostTimerStartReq } from '@/shared/types/api/timer';

import { authClient } from '../client';

const TIMER_ENDPOINT = {
	GET_TIMER_TODOS: 'api/v2/timer/todo-card',
	GET_TIMER_FRIENDS: 'api/v2/timer/friends',
	POST_STOP_TIMER: 'api/v2/timer/stop/:taskId',
	POST_TIMER_START: 'api/v2/timer/run',
};

export const getTimerTodos = async ({ targetDate }: GetTimerTodosReq): Promise<GetTimerTodosRes> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_TIMER_TODOS, { params: { targetDate } });
	return data;
};

export const getTimerFriends = async (): Promise<GetTimerTodosRes> => {
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

export const postTimerStart = async ({ elapsedTime, runningCategoryName, taskId }: PostTimerStartReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_TIMER_START, { elapsedTime, runningCategoryName, taskId });
	return data;
};
