import { useMutation, useQuery } from '@tanstack/react-query';

import { getTodoCard, postTimerStop } from '../axios';

export const useGetTodoCard = (targetDate: string) => {
	return useQuery({
		queryKey: ['todo', targetDate],
		queryFn: () => getTodoCard(targetDate),
	});
};

export const usePostTimerStop = () => {
	return useMutation({
		mutationFn: ({ taskId, elapsedTime, targetDate }: { taskId: string; elapsedTime: number; targetDate: string }) =>
			postTimerStop(taskId, targetDate, elapsedTime),
	});
};
