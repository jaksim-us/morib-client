import axios from 'axios';

import { TIMER_MOCK_URL } from '@/mocks/timer/resolvers/timerResolvers';

export const postTimerStop = async (taskId: string, targetDate: string, elapsedTime: number) => {
	const url = TIMER_MOCK_URL.POST_TIMER_STOP.replace(':taskId', taskId);
	const { data } = await axios.post(url, {
		targetDate: targetDate,
		elapsedTime: elapsedTime,
	});
	return data;
};

export const getTodoCard = async (targetDate: string) => {
	const { data } = await axios.get(TIMER_MOCK_URL.GET_TODO_CARD, {
		params: { targetDate },
	});
	return data;
};
