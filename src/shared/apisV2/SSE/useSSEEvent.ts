import { useAtom } from 'jotai';

import { sseEventAtom } from '@/shared/stores/atoms/SSEAtoms';

export const useSSEEvent = () => {
	const [event] = useAtom(sseEventAtom);
	return event;
};
