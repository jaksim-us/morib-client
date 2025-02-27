export const SSE_ENDPOINT = {
	GET_SSE_CONNECTION: 'api/v2/sse/connect',
	GET_SSE_REFRESH: ({
		elapsedTime,
		runningCategoryName,
		taskId,
	}: {
		elapsedTime?: number;
		runningCategoryName?: string;
		taskId?: number;
	}) =>
		`api/v2/sse/refresh${elapsedTime && `?elapsedTime=${elapsedTime}`}${runningCategoryName && `?runningCategoryName=${runningCategoryName}`}${taskId && `?taskId=${taskId}`}`,
};
