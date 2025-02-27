import { GetUrlNameReq, GetUrlNameRes } from '@/shared/types/api/common';
import { PostToggleTaskStatusReq } from '@/shared/types/api/home';

import { authClient } from '../client';

export const COMMON_ENDPOINT = {
	GET_URL_NAME: 'api/v2/tabName',
	POST_TOGGLE_TASK_STATUS: 'api/v2/tasks/:taskId/status',
};

export const getUrlName = async ({ url }: GetUrlNameReq): Promise<GetUrlNameRes> => {
	const { data } = await authClient.get(COMMON_ENDPOINT.GET_URL_NAME, { params: { url } });
	return data;
};

export const postToggleTaskStatus = async ({ taskId }: PostToggleTaskStatusReq) => {
	const { data } = await authClient.post(COMMON_ENDPOINT.POST_TOGGLE_TASK_STATUS.replace(':taskId', String(taskId)));
	return data;
};
