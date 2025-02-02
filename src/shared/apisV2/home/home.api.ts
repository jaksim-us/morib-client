import {
	DeleteCategoryReq,
	GetCategoryTaskReq,
	GetCategoryTaskRes,
	GetWorkTimeReq,
	GetWorkTimeRes,
	PostCreateTaskReq,
	PostToggleTaskStatusReq,
	postAddTodayTodosReq,
} from '@/shared/types/api/home';

import { authClient } from '../client';

export const HOME_ENDPOINT = {
	GET_CATEGORY: 'api/v2/home',
	GET_WORK_TIME: 'api/v2/timer',
	POST_TIMER_START: 'api/v2/timer/start',
	POST_CREATE_TASK: '/api/v2/tasks/:categoryId',
	POST_TOGGLE_TASK_STATUS: 'api/v2/tasks/:taskId/status',
	DELETE_CATEGORY: 'api/v2/categories/:categoryId',
};

export const getCategoryTask = async ({ startDate, endDate }: GetCategoryTaskReq): Promise<GetCategoryTaskRes> => {
	const { data } = await authClient.get(HOME_ENDPOINT.GET_CATEGORY, {
		params: { startDate, endDate },
	});
	return data;
};

export const getWorkTime = async ({ targetDate }: GetWorkTimeReq): Promise<GetWorkTimeRes> => {
	const { data } = await authClient.get(HOME_ENDPOINT.GET_WORK_TIME, {
		params: { targetDate },
	});
	return data;
};

export const postAddTodayTodos = async ({ targetDate, taskList }: postAddTodayTodosReq) => {
	const { data } = await authClient.post(HOME_ENDPOINT.POST_TIMER_START, { taskList }, { params: { targetDate } });
	return data;
};

export const postCreateTask = async ({ categoryId, name, startDate, endDate }: PostCreateTaskReq) => {
	const { data } = await authClient.post(
		HOME_ENDPOINT.POST_CREATE_TASK.replace(':categoryId', String(categoryId)),
		{ name },
		{ params: { startDate, endDate } },
	);

	return data;
};

export const postToggleTaskStatus = async ({ taskId }: PostToggleTaskStatusReq) => {
	const { data } = await authClient.post(HOME_ENDPOINT.POST_TOGGLE_TASK_STATUS.replace(':taskId', String(taskId)));
	return data;
};

export const deleteCategory = async ({ categoryId }: DeleteCategoryReq) => {
	const { data } = await authClient.delete(HOME_ENDPOINT.DELETE_CATEGORY.replace(':categoryId', String(categoryId)));
	return data;
};
