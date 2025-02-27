// sseAtoms.ts
import { EventSourcePolyfill } from 'event-source-polyfill';
import { atom } from 'jotai';

import { getAccessToken } from '@/shared/utils/auth';

import { SSEEventType } from '@/shared/types/SSEEvent';

import { SSE_ENDPOINT } from '@/shared/apisV2/SSE/SSE.endpoint';
import { API_URL } from '@/shared/apisV2/client';

// SSE 연결 인스턴스를 저장하는 atom
export const sseConnectionAtom = atom<EventSourcePolyfill | null>(null);

// 최신 SSE 이벤트 데이터를 저장하는 atom (필요에 따라 이벤트 로그 배열 등으로 확장 가능)
export const sseEventAtom = atom<{ type: SSEEventType; data: any } | null>(null);

// 액션을 위한 atom: 상태는 가지지 않고, 액션 디스패처 역할을 함
export const sseActionsAtom = atom(null, (get, set, action: { type: string; payload?: any }) => {
	switch (action.type) {
		case 'CONNECT': {
			const accessToken = getAccessToken();
			if (!accessToken) {
				console.warn('SSE 연결을 위한 access token이 없습니다.');
				return;
			}
			// 기존 연결이 있다면 먼저 종료
			const existingConnection = get(sseConnectionAtom);
			if (existingConnection) {
				existingConnection.close();
			}
			// 기본 SSE 연결 생성
			const eventSource = new EventSourcePolyfill(API_URL + SSE_ENDPOINT.GET_SSE_CONNECTION, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			// 이벤트 리스너 등록
			eventSource.addEventListener('connect', (event) => {
				console.log('SSE connect event:', event);
				set(sseEventAtom, { type: 'connect', data: event });
			});

			eventSource.addEventListener('timeout', (event) => {
				// timeout 이벤트 발생 시 refresh 엔드포인트로 재연결
				set(sseEventAtom, { type: 'timeout', data: event });
			});

			eventSource.addEventListener('completion', (event) => {
				console.log('SSE completion event:', event);
				set(sseEventAtom, { type: 'completion', data: event });
			});

			eventSource.addEventListener('refresh', (event) => {
				console.log('SSE refresh event:', event);
				set(sseEventAtom, { type: 'refresh', data: event });
			});

			// 추가 이벤트: 예시로 타이머, 친구 요청 이벤트 처리
			eventSource.addEventListener('timerStart', (event) => {
				set(sseEventAtom, { type: 'timerStart', data: event });
			});
			eventSource.addEventListener('timerStopAction', (event) => {
				set(sseEventAtom, { type: 'timerStopAction', data: event });
			});
			eventSource.addEventListener('friendRequest', (event) => {
				set(sseEventAtom, { type: 'friendRequest', data: event });
			});
			eventSource.addEventListener('friendRequestAccept', (event) => {
				set(sseEventAtom, { type: 'friendRequestAccept', data: event });
			});

			// 새 연결을 atom에 저장
			set(sseConnectionAtom, eventSource);
			break;
		}
		case 'DISCONNECT': {
			const connection = get(sseConnectionAtom);
			if (connection) {
				connection.close();
			}
			set(sseConnectionAtom, null);
			break;
		}
		default:
			break;
	}
});
