import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCategory, postAddTodayTodos, postCreateTask, postToggleTaskStatus } from './home.api';
import { homeKeys } from './home.keys';

export const usePostAddTodayTodos = () => {
	return useMutation({
		mutationFn: postAddTodayTodos,
	});
};

export const usePostCreateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postCreateTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};

export const usePostToggleTaskStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postToggleTaskStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};

export const useDeleteCategory = () => {
	return useMutation({
		mutationFn: deleteCategory,
	});
};
