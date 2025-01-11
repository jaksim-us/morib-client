import { HttpResponse, http } from 'msw';

import { TIMER_RES } from '../responses/timerResponses';

export const TIMER_MOCK_URL = {
	POST_TIMER_STOP: 'api/v2/timer/stop/:taskId',
	GET_TODO_CARD: 'api/v2/timer/todo-card',
};

export const timerResolvers = [
	http.post<{ taskId: string }, { targetDate: string; elapsedTime: number }>(
		TIMER_MOCK_URL.POST_TIMER_STOP,
		async ({ params, request }) => {
			const { taskId } = params;
			const { targetDate, elapsedTime } = await request.json();

			if (!taskId || !targetDate || !elapsedTime) {
				console.error('taskId or targetDate or elapsedTime is not exist');
				throw new HttpResponse(null, { status: 400 });
			}

			return HttpResponse.json(TIMER_RES.POST_TIMER_STOP);
		},
	),

	http.get(TIMER_MOCK_URL.GET_TODO_CARD, async ({ request }) => {
		const url = new URL(request.url);
		const targetDate = url.searchParams.get('targetDate');
		if (!targetDate) {
			console.error('targetDate is not exist');
			throw new HttpResponse(null, { status: 400 });
		}

		return HttpResponse.json(TIMER_RES.GET_TODO_CARD);
	}),
];
