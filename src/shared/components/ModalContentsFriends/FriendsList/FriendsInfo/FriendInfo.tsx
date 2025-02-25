import Dropdown from '@/shared/components/Dropdown/Dropdown';

import { formatSecondsForFriendsList } from '@/shared/utils/time';

import DeleteBtn from '@/shared/assets/svgs/friend_delBtn.svg?react';

import FriendUserProfile from '../../FriendUserProfile/FriendUserProfile';

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
								<p className="text-white subhead-bold-20">{friend.name}</p>
								<p className="text-gray-04 body-reg-16">{friend.email}</p>
							</div>
						</div>
						<p className="flex w-[30rem] self-center p-[0.8rem] text-white subhead-med-18">
							{friend.isPlaying ? '온라인' : '오프라인'}
						</p>
						<p className="flex w-[46rem] self-center p-[0.8rem] text-white subhead-med-18">
							{formatSecondsForFriendsList(friend?.time)}
						</p>

						<Dropdown>
							<Dropdown.Trigger>
								<button className="flex h-[24px] w-[24px] flex-col items-center justify-center">
									<DeleteBtn />
								</button>
							</Dropdown.Trigger>
							<Dropdown.Content boxShadow="shadow-none" className="right-0 top-[26px]">
								<Dropdown.Item label="친구삭제" textColor="red" />
							</Dropdown.Content>
						</Dropdown>
					</li>
				);
			})}
		</>
	);
};

export default FriendInfo;
