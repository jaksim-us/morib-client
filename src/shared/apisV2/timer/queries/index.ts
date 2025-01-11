import { useQuery } from '@tanstack/react-query';

import { getTodoCard } from '../axios';

export const useGetTodoCard = (targetDate: string) => {
	return useQuery({
		queryKey: ['todo', targetDate],
		queryFn: () => getTodoCard(targetDate),
	});
};
