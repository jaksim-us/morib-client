export const TIMER_RES = {
	POST_TIMER_STOP: {
		status: 200,
		message: '요청이 성공했습니다.',
	},

	GET_TODO_CARD: {
		status: 200,
		message: '요청이 성공했습니다.',
		data: {
			sumTodayElapsedTime: 28911,
			task: [
				{
					name: 'userExam 데이터 크롤링',
					startDate: '2024-05-29',
					endDate: '2024-07-15',
					isComplete: false,
					elapsedTime: 13524,
				},
				{
					name: '학습/검증 데이터 분할하기',
					startDate: '2024-06-25',
					endDate: '2024-07-15',
					isComplete: false,
					elapsedTime: 15387,
				},
			],
		},
	},
};
