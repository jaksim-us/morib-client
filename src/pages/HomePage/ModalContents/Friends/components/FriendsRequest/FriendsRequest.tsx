import { userFriendData } from '@/shared/mocks/userFriendData';

import ButtonRequestAction from './components/ButtonRequestAction';
import FriendsListRequested from './components/FriendsListRequested';
import InputSendRequest from './components/InputSendRequest';

const FriendsRequest = () => {
	return (
		<div>
			<div className="relative mb-[4rem] mt-[2rem]">
				<InputSendRequest />
			</div>
			<div className="h-[52.5rem] overflow-scroll">
				<h2 className="subhead-bold-22 px-[1rem] py-[2rem] text-white">받은 요청</h2>
				<FriendsListRequested friendsData={userFriendData}>
					<div className="flex w-full items-center justify-end gap-[1rem]">
						<ButtonRequestAction variant="positive">수락</ButtonRequestAction>
						<ButtonRequestAction variant="negative">거절</ButtonRequestAction>
					</div>
				</FriendsListRequested>

				<h2 className="subhead-bold-22 mt-[4rem] px-[1rem] py-[2rem] text-white">보낸 요청</h2>
				<FriendsListRequested friendsData={userFriendData}>
					<div className="flex w-full items-center justify-end">
						<ButtonRequestAction variant="negative">요청 취소</ButtonRequestAction>
					</div>
				</FriendsListRequested>
			</div>
		</div>
	);
};

export default FriendsRequest;
