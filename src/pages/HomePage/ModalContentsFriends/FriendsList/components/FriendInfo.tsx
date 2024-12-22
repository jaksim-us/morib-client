import Dropdown from '@/shared/components/Dropdown';
import FriendUserProfile from '@/shared/components/ModalContents/FriendUserProfile';

import { formatSecondsForFriendsList } from '@/shared/utils/time';

import DeleteBtn from '@/shared/assets/svgs/friend_delBtn.svg?react';

interface FriendsData {
	id: number;
	name: string;
	image: string;
	email: string;
	isPlaying: boolean;
	time: number;
	categoryName: string;
}

type FriendsInfoProp = {
	friendsData: FriendsData[];
};

const FriendInfo = ({ friendsData }: FriendsInfoProp) => {
	return (
		<>
			{friendsData.map((friend: FriendsData) => {
				return (
					<li key={friend.id} className="flex items-center border-t-[1px] border-gray-bg-06 py-[1.5rem]">
						<div className="flex w-[40rem]">
							<FriendUserProfile isConnecting={friend.isPlaying} imgSrc={friend.image} />
							<div className="ml-[2rem] flex flex-col justify-center">
								<p className="subhead-bold-20 text-white">{friend.name}</p>
								<p className="body-reg-16 text-gray-04">{friend.email}</p>
							</div>
						</div>
						<p className="subhead-med-18 flex w-[30rem] self-center p-[0.8rem] text-white">
							{friend.isPlaying ? '온라인' : '오프라인'}
						</p>
						<p className="subhead-med-18 flex w-[46rem] self-center p-[0.8rem] text-white">
							{formatSecondsForFriendsList(friend?.time)}
						</p>

						<Dropdown.Root>
							<Dropdown.Trigger>
								<button className="flex h-[24px] w-[24px] flex-col items-center justify-center">
									<DeleteBtn />
								</button>
							</Dropdown.Trigger>
							<Dropdown.Content boxShadow="shadow-none" className="right-0 top-[26px]">
								<Dropdown.Item label="친구삭제" textColor="red" />
							</Dropdown.Content>
						</Dropdown.Root>
					</li>
				);
			})}
		</>
	);
};

export default FriendInfo;
