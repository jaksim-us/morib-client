import { GetTimerTodosReq } from '@/shared/types/api/timer';

export const timerKeys = {
	timer: ['timer'] as const,
	todos: ({ targetDate }: GetTimerTodosReq) => [...timerKeys.timer, targetDate],
	friends: () => [...timerKeys.timer, 'friends'],
};
