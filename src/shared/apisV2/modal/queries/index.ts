import { useQuery } from '@tanstack/react-query';

import { getUserProfile } from '@/shared/apisV2/modal/axios';

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	imageUrl: string;
	isPushEnabled: boolean;
}

export const useGetUserProfile = () => {
	return useQuery<UserProfile>({
		queryKey: ['UserProfile'],
		queryFn: () => getUserProfile(),
	});
};
