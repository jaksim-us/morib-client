import { useAtom } from 'jotai';

import { useEffect } from 'react';

import { sseActionsAtom } from '@/shared/stores/atoms/SSEAtoms';

export const useSSE = () => {
	const [, dispatch] = useAtom(sseActionsAtom);

	useEffect(() => {
		dispatch({ type: 'CONNECT' });

		return () => {
			dispatch({ type: 'DISCONNECT' });
		};
	}, [dispatch]);

	return { dispatch };
};
