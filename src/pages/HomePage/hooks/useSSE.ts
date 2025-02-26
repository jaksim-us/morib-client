import { EventSourcePolyfill } from 'event-source-polyfill';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '@/shared/utils/auth';

import { API_URL } from '@/shared/apisV2/client';
import { COMMON_ENDPOINT } from '@/shared/apisV2/common/common.api';

// TODO: 다음 PR에서 구현 예정
export const useSSE = () => {
	const queryClient = useQueryClient();
	const accessToken = getAccessToken();

	useEffect(() => {
		const connect = () => {
			if (!accessToken) {
				console.warn('SSE 연결을 위한 access token이 없습니다.');
				return;
			}

			const eventSource = new EventSourcePolyfill(API_URL + COMMON_ENDPOINT.GET_SSE_CONNECTION, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			eventSource.addEventListener('completion', (event) => {
				console.log(event);
				// queryClient.invalidateQueries(['threadData', teamPlaceId]);
			});

			eventSource.addEventListener('refresh', (event) => {
				console.log(event);
				// queryClient.setQueryData('data', (oldData = []) => [...oldData, newData]);
			});

			eventSource.addEventListener('timerStart', (event) => {
				console.log(event);
			});

			eventSource.addEventListener('timerStopAction', (event) => {
				console.log(event);
			});

			eventSource.addEventListener('friendRequest', (event) => {
				console.log(event);
			});

			eventSource.addEventListener('friendRequestAccept', (event) => {
				console.log(event);
			});

			return () => {
				eventSource.close();
			};
		};

		return connect();
	}, []);
};
