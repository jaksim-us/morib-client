import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCategory, deleteTask, postAddCategory, postAddTodayTodos, postCreateTask } from './home.api';
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

export const useAddCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postAddCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};

export const useDeleteTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};
