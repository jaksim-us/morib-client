export const SSE_ENDPOINT = {
	GET_SSE_CONNECTION: 'api/v2/sse/connect',
	GET_SSE_REFRESH: ({
		elapsedTime,
		runningCategoryName,
		taskId,
	}: {
		elapsedTime?: string;
		runningCategoryName?: string;
		taskId?: string;
	}) => {
		const params = [];
		if (elapsedTime !== undefined) params.push(`elapsedTime=${encodeURIComponent(elapsedTime)}`);
		if (runningCategoryName) params.push(`runningCategoryName=${encodeURIComponent(runningCategoryName)}`);
		if (taskId !== undefined) params.push(`taskId=${encodeURIComponent(taskId)}`);
		return `api/v2/sse/refresh${params.length ? '?' + params.join('&') : ''}`;
	},
};
