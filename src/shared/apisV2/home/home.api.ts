import axios from 'axios';

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

import { HOME_MOCK_URL } from '@/mocks/home/home.resolvers';

export const getCategoryTask = async ({ startDate, endDate }: GetCategoryTaskReq): Promise<GetCategoryTaskRes> => {
	const { data } = await axios.get(HOME_MOCK_URL.GET_CATEGORY, {
		params: { startDate, endDate },
	});
	return data;
};

export const getWorkTime = async ({ targetDate }: GetWorkTimeReq): Promise<GetWorkTimeRes> => {
	const { data } = await axios.get(HOME_MOCK_URL.GET_WORK_TIME, {
		params: { targetDate },
	});
	return data;
};

export const postAddTodayTodos = async ({ targetDate, taskList }: postAddTodayTodosReq) => {
	const { data } = await axios.post(HOME_MOCK_URL.POST_TIMER_START, { taskList }, { params: { targetDate } });
	return data;
};

export const postCreateTask = async ({ categoryId, name, startDate, endDate }: PostCreateTaskReq) => {
	const { data } = await axios.post(
		HOME_MOCK_URL.POST_CREATE_TASK.replace(':categoryId', String(categoryId)),
		{ name },
		{ params: { startDate, endDate } },
	);

	return data;
};

export const postToggleTaskStatus = async ({ taskId }: PostToggleTaskStatusReq) => {
	const { data } = await axios.post(HOME_MOCK_URL.POST_TOGGLE_TASK_STATUS.replace(':taskId', String(taskId)));
	return data;
};

export const deleteCategory = async ({ categoryId }: DeleteCategoryReq) => {
	const { data } = await axios.delete(HOME_MOCK_URL.DELETE_CATEGORY.replace(':categoryId', String(categoryId)));
	return data;
};
