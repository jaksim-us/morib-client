import { useQuery } from '@tanstack/react-query';

import { getFriendProfile } from '@/shared/apisV2/home/axios';

interface FriendProfileData {
	id: number;
	name: string;
	email: string;
	imageUrl: string;
	isPushEnabled: boolean;
}

export const useGetFriendProfile = () => {
	return useQuery({
		queryKey: ['FriendProfile'],
		queryFn: () => getFriendProfile(),
	});
};
