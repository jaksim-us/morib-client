import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
	deleteCancelFriendRequest,
	deleteFriend,
	deleteRejectFriendRequest,
	postAcceptFriendRequest,
	postSendFriendRequestReq,
} from './friends.api';
import { friendKeys } from './friends.keys';

export const usePostSendFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postSendFriendRequestReq,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friendRequestList() });
		},
	});
};

export const usePostCancelFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCancelFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friendRequestList() });
		},
	});
};

export const usePostAcceptFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postAcceptFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friend });
		},
	});
};

export const usePostRejectFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteRejectFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friendRequestList() });
		},
	});
};

export const useDeleteFriend = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteFriend,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friendList() });
		},
	});
};
